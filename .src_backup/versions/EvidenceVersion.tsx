import EvidenceMatrix from '../sections/EvidenceMatrix'
import Credentials from '../sections/Credentials'
import HarshProjects from '../sections/HarshProjects'
import PremiumNav from '../components/PremiumNav'
import PremiumFooter from '../sections/PremiumFooter'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function EvidenceVersion() {
  useSmoothScroll()

  return (
    <div className="bg-bg text-text-primary min-h-screen relative">
      <PremiumNav />
      <main className="relative z-10 pt-32">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-gradient-primary mb-6">
            Radical Transparency
          </h1>
          <p className="text-text-secondary text-lg">
            An evidence-based approach to professional capability. No inflation, just verified data and commit history.
          </p>
        </div>
        <EvidenceMatrix />
        <Credentials />
        <HarshProjects />
      </main>
      <PremiumFooter />
    </div>
  )
}
