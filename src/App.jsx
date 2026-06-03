import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage from './components/DashboardPage'
import Placeholder from './components/Placeholder'
import useFilters from './hooks/useFilters'
import './styles/global.css'
import './styles/layout.css'
import './styles/dashboard.css'
import './styles/filters.css'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const { filters, setFilter, reset, isDirty, data } = useFilters()

  function handleAddSale() {
    // il modal arriverà nel Pezzo 4
    console.log('Apri modal nuova vendita')
  }

  function renderPage() {
    if (activePage === 'dashboard') return (
      <DashboardPage
        filters={filters}
        onFilter={setFilter}
        onReset={reset}
        isDirty={isDirty}
        data={data}
      />
    )
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
