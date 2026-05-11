import { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/lib/agentmail'
import { SITE_CONFIG } from '@/lib/constants'

const googleEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
)
const emailMagicLinkEnabled = Boolean(process.env.AGENTMAIL_API_KEY)

const providers: any[] = [
  // Existing admin auth — keeps working unchanged
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('メールアドレスとパスワードを入力してください')
      }
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      })
      if (!user || !user.passwordHash) {
        throw new Error('ユーザーが見つかりません')
      }
      const ok = await bcrypt.compare(credentials.password, user.passwordHash)
      if (!ok) throw new Error('パスワードが正しくありません')
      if (!user.isActive) throw new Error('このユーザーアカウントは無効です')
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    },
  }),
]

if (googleEnabled) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // auto-link by email if user already exists
    }),
  )
}

if (emailMagicLinkEnabled) {
  providers.push(
    EmailProvider({
      // server config is unused since we override sendVerificationRequest,
      // but the provider requires it to be defined
      server: { host: 'unused', port: 587, auth: { user: 'unused', pass: 'unused' } },
      from: 'prompta-agent@agentmail.to',
      maxAge: 60 * 60, // 1h link validity
      async sendVerificationRequest({ identifier, url }) {
        const subject = '【prompta.jp】サインインリンク'
        const text = `prompta.jp にサインインするには、以下のリンクをクリックしてください：

${url}

※ このリンクは 1 時間有効です。
※ お心当たりがない場合はこのメールを無視してください。

prompta.jp
${SITE_CONFIG.url}
`
        const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1f2937">
  <h2 style="color:#0284c7;margin:0 0 16px">サインインリンク</h2>
  <p>prompta.jp にサインインするには、下のボタンを押してください。</p>
  <p style="margin:24px 0;text-align:center">
    <a href="${url}" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">サインイン</a>
  </p>
  <p style="font-size:12px;color:#6b7280">リンクが開けない場合は以下を直接コピー：<br><span style="word-break:break-all">${url}</span></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
  <p style="font-size:12px;color:#9ca3af">このリンクは 1 時間有効です。<br>お心当たりがない場合はこのメールを無視してください。</p>
  <p style="font-size:12px;color:#9ca3af"><a href="${SITE_CONFIG.url}" style="color:#9ca3af">prompta.jp</a></p>
</div>`
        const r = await sendEmail({ to: identifier, subject, text, html })
        if (!r.ok) throw new Error(r.error ?? 'send failed')
      },
    }),
  )
}

export const authOptions: NextAuthOptions = {
  // PrismaAdapter is required for OAuth/Email providers (User/Account/VerificationToken persistence).
  // CredentialsProvider remains compatible because we keep session strategy = jwt.
  adapter: PrismaAdapter(prisma) as any,
  providers,
  session: { strategy: 'jwt' },
  pages: {
    // Public end-user sign-in page (admin still uses /admin/login)
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role ?? 'MEMBER'
        token.email = user.email
      }
      // For OAuth/Email providers, user is only present on first sign-in.
      // Subsequent JWT refreshes need to keep the role from token.
      if (account && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, role: true },
        })
        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        ;(session.user as any).id = token.id as string
        ;(session.user as any).role = token.role as string
      }
      return session
    },
  },
  events: {
    async signIn({ user }) {
      try {
        if (user?.id) {
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          })
        }
      } catch {
        // ignore
      }
      // Phase 0 (2026-05-11) — grant welcome bonus credits on every sign-in,
      // but idempotent (welcomeBonusAt gate prevents repeat grants).
      try {
        if (user?.email) {
          const { grantWelcomeBonusIfEligible } = await import('@/lib/paid-credits')
          await grantWelcomeBonusIfEligible(user.email)
        }
      } catch (e) {
        console.error('[auth] welcome bonus grant failed:', (e as Error)?.message)
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
