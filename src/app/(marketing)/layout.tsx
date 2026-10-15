import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SessionProviderWrapper } from '@/components/layout/SessionProviderWrapper'
import { CheckoutReturnHandler } from '@/components/credits/CheckoutReturnHandler'
import { GaEventFlush } from '@/components/analytics/GaEventFlush'

// Login state and the header credit balance are client-only (HeaderAuthMenu).
// This layout must not call cookies(), headers(), or getServerSession — that
// would opt every public page out of static/ISR rendering.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProviderWrapper>
      <Header />
      <GaEventFlush />
      <CheckoutReturnHandler />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SessionProviderWrapper>
  )
}
