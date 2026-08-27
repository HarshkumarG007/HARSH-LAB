import CyberpunkNav from '../components/CyberpunkNav'
import HarshHero from '../sections/HarshHero'
import EvidenceMatrix from '../sections/EvidenceMatrix'
import HarshProjects from '../sections/HarshProjects'
import Credentials from '../sections/Credentials'
import HarshContact from '../sections/HarshContact'
import Footer from '../sections/Footer'
import MatrixRain from '../components/MatrixRain'
import CustomCursor from '../components/CustomCursor'

export default function CyberpunkVersion() {
  return (
    <div className="bg-background text-text-primary min-h-screen relative">
      <CustomCursor />
      <MatrixRain />
      <CyberpunkNav />
      <main className="relative z-10">
        <HarshHero />
        <EvidenceMatrix />
        <HarshProjects />
        <Credentials />
        <HarshContact />
      </main>
      <Footer />
    </div>
  )
}
