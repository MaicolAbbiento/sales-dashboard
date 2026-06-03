import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage from './components/DashboardPage'
import Placeholder from './components/Placeholder'
import './styles/global.css'
import './styles/layout.css'
import './styles/dashboard.css'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  function handleAddSale() {
    // il modal arriverà nel Pezzo 4
    console.log('Apri modal nuova vendita')
  }

  function renderPage() {
    if (activePage === 'dashboard') return <DashboardPage />
    return <Placeholder page={activePage} />
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-area">
        <Header activePage={activePage} onAddSale={handleAddSale} />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
