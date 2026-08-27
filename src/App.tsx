import { VersionProvider } from './contexts/VersionContext'
import VersionRouter from './components/VersionRouter'
import VersionSwitcher from './components/VersionSwitcher'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './styles/god-tier.css'
import './styles/precious-metals.css'
import './styles/performance.css'

// Single Lenis instance at the App level — shared by all versions.
// This prevents the double-instance conflict that caused jank during version switches.
function AppContent() {
  useSmoothScroll()

  return (
    <ErrorBoundary>
      <VersionProvider>
        <div className="relative">
          <VersionRouter />
          <VersionSwitcher />
        </div>
      </VersionProvider>
    </ErrorBoundary>
  )
}

export default function App() {
  return <AppContent />
}
