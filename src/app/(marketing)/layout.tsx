import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SessionProviderWrapper } from '@/components/layout/SessionProviderWrapper'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProviderWrapper>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SessionProviderWrapper>
  )
}
