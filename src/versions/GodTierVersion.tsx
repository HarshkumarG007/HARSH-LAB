import GodHero from '../components/GodHero'
import LuxeCursor from '../components/LuxeCursor'
import PremiumNav from '../components/PremiumNav'
import PremiumEvidence from '../sections/PremiumEvidence'
import PremiumProjects from '../sections/PremiumProjects'
import PremiumCredentials from '../sections/PremiumCredentials'
import PremiumContact from '../sections/PremiumContact'
import PremiumFooter from '../sections/PremiumFooter'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function GodTierVersion() {
  useSmoothScroll()

  return (
    <div className="bg-bg text-text-primary min-h-screen relative cursor-none">
      <LuxeCursor />
      <div className="noise-subtle" />
      <PremiumNav />
      <main className="relative z-10">
        <GodHero />
        <PremiumEvidence />
        <PremiumProjects />
        <PremiumCredentials />
        <PremiumContact />
      </main>
      <PremiumFooter />
    </div>
  )
}
