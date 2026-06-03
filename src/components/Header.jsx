import { Plus, Bell } from 'lucide-react'

const pageTitles = {
  dashboard: 'Dashboard',
  sales: 'Vendite',
  orders: 'Ordini',
  customers: 'Clienti',
  settings: 'Impostazioni',
}

export default function Header({ activePage, onAddSale }) {
  return (
    <header className="header">
      <h1 className="header-title">{pageTitles[activePage] ?? 'Dashboard'}</h1>
      <div className="header-actions">
        <button className="btn btn-ghost" aria-label="Notifiche">
          <Bell size={15} />
        </button>
        <button className="btn btn-primary" onClick={onAddSale}>
          <Plus size={15} />
          Nuova vendita
        </button>
      </div>
    </header>
  )
}
