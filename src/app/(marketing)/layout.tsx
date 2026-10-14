import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SessionProviderWrapper } from '@/components/layout/SessionProviderWrapper'
import { CheckoutReturnHandler } from '@/components/credits/CheckoutReturnHandler'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProviderWrapper>
      <Header />
      <CheckoutReturnHandler />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SessionProviderWrapper>
  )
}
