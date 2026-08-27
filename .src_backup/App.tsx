import { VersionProvider } from './contexts/VersionContext'
import VersionRouter from './components/VersionRouter'
import VersionSwitcher from './components/VersionSwitcher'
import { ErrorBoundary } from './components/ErrorBoundary'
import './styles/god-tier.css'
import './styles/precious-metals.css'

function App() {
  return (
    <ErrorBoundary>
      <VersionProvider>
        <div className="relative">
          {/* Version Router handles switching */}
          <VersionRouter />
          
          {/* Permanent Version Switcher */}
          <VersionSwitcher />
        </div>
      </VersionProvider>
    </ErrorBoundary>
  )
}

export default App
