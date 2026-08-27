import PremiumNav from '../components/PremiumNav'
import PremiumHero from '../sections/PremiumHero'
import PremiumEvidence from '../sections/PremiumEvidence'
import PremiumProjects from '../sections/PremiumProjects'
import PremiumCredentials from '../sections/PremiumCredentials'
import PremiumContact from '../sections/PremiumContact'
import PremiumFooter from '../sections/PremiumFooter'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function PremiumVersion() {
  useSmoothScroll()

  return (
    <div className="bg-bg text-text-primary min-h-screen relative selection:bg-accent/30">
      <PremiumNav />
      <main className="relative z-10">
        <PremiumHero />
        <PremiumEvidence />
        <PremiumProjects />
        <PremiumCredentials />
        <PremiumContact />
      </main>
      <PremiumFooter />
    </div>
  )
}
