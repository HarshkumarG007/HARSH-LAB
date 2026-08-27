import { VersionProvider } from './contexts/VersionContext'
import VersionRouter from './components/VersionRouter'
import VersionSwitcher from './components/VersionSwitcher'
import './styles/god-tier.css'
import './styles/precious-metals.css'

function App() {
  return (
    <VersionProvider>
      <div className="relative">
        <VersionRouter />
        <VersionSwitcher />
      </div>
    </VersionProvider>
  )
}

export default App
