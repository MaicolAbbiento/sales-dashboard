import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage from './components/DashboardPage'
import Placeholder from './components/Placeholder'
import AddSaleModal from './components/AddSaleModal'
import Toast from './components/Toast'
import useFilters from './hooks/useFilters'
import { fetchSales, createSale, deleteSale } from './data/api'
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
  const [apiOnline, setApiOnline]   = useState(null) // null = checking
  const { filters, setFilter, reset, isDirty, data } = useFilters()

  // Carica vendite dal DB all'avvio
  const loadSales = useCallback(async () => {
    try {
      const data = await fetchSales()
      setSales(data)
      setApiOnline(true)
    } catch {
      setApiOnline(false)
    }
  }, [])

  useEffect(() => { loadSales() }, [loadSales])

  async function handleSave(sale) {
    if (apiOnline) {
      try {
        const saved = await createSale(sale)
        setSales(prev => [saved, ...prev])
        setShowModal(false)
        setToast(`"${saved.prodotto}" salvata nel database`)
        return
      } catch (e) {
        setToast(`Errore API: ${e.message}`)
        return
      }
    }
    // fallback locale se il server non è attivo
    setSales(prev => [{ ...sale, id: Date.now(), created_at: new Date().toISOString() }, ...prev])
    setShowModal(false)
    setToast(`"${sale.prodotto}" aggiunta (solo in memoria — server offline)`)
  }

  async function handleDelete(id) {
    if (apiOnline) {
      try {
        await deleteSale(id)
      } catch {
        // ignora errore delete, rimuovi comunque dalla UI
      }
    }
    setSales(prev => prev.filter(s => s.id !== id))
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
        apiOnline={apiOnline}
        onDelete={handleDelete}
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
