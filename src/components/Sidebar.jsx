import { BarChart2, ShoppingCart, Users, Settings, TrendingUp } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { id: 'sales', label: 'Vendite', icon: TrendingUp },
  { id: 'orders', label: 'Ordini', icon: ShoppingCart },
  { id: 'customers', label: 'Clienti', icon: Users },
]

const bottomItems = [
  { id: 'settings', label: 'Impostazioni', icon: Settings },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <BarChart2 size={18} />
        </div>
        <span className="sidebar-logo-text">SalesDash</span>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Menu</span>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item${activePage === id ? ' active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}

        <span className="nav-section-label" style={{ marginTop: 'auto' }}>Sistema</span>
        {bottomItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item${activePage === id ? ' active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
