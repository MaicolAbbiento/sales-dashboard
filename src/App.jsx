import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage from './components/DashboardPage'
import Placeholder from './components/Placeholder'
import AddSaleModal from './components/AddSaleModal'
import Toast from './components/Toast'
import useFilters from './hooks/useFilters'
import './styles/global.css'
import './styles/layout.css'
import './styles/dashboard.css'
import './styles/filters.css'
import './styles/modal.css'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [showModal, setShowModal]   = useState(false)
  const [toast, setToast]           = useState(null)
  const [sales, setSales]           = useState([])
  const { filters, setFilter, reset, isDirty, data } = useFilters()

  function handleSave(sale) {
    setSales(prev => [sale, ...prev])
    setShowModal(false)
    setToast(`Vendita "${sale.prodotto}" aggiunta con successo`)
  }

  function renderPage() {
    if (activePage === 'dashboard') return (
      <DashboardPage
        filters={filters}
        onFilter={setFilter}
        onReset={reset}
        isDirty={isDirty}
        data={data}
        sales={sales}
      />
    )
    return <Placeholder page={activePage} />
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-area">
        <Header activePage={activePage} onAddSale={() => setShowModal(true)} />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>

      {showModal && (
        <AddSaleModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}

      {toast && (
        <Toast message={toast} onDone={() => setToast(null)} />
      )}
    </div>
  )
}
