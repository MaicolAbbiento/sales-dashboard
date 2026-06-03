import { Euro, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import KpiCard from './KpiCard'
import SalesChart from './SalesChart'
import CategoryChart from './CategoryChart'
import FilterBar from './FilterBar'
import { categoryData } from '../data/mockData'

const kpiConfig = [
  { key: 'totaleVendite', label: 'Totale Vendite', type: 'currency', icon: Euro,         iconBg: 'rgba(99,102,241,0.7)'  },
  { key: 'ordiniTotali',  label: 'Ordini Totali',  type: 'number',   icon: ShoppingCart, iconBg: 'rgba(34,197,94,0.7)'   },
  { key: 'clientiAttivi', label: 'Clienti Attivi', type: 'number',   icon: Users,        iconBg: 'rgba(59,130,246,0.7)'  },
  { key: 'valoreMedio',   label: 'Valore Medio',   type: 'currency', icon: TrendingUp,   iconBg: 'rgba(245,158,11,0.7)'  },
]

export default function DashboardPage({ filters, onFilter, onReset, isDirty, data }) {
  const { monthlySales, kpiData } = data

  return (
    <>
      <FilterBar filters={filters} onFilter={onFilter} onReset={onReset} isDirty={isDirty} />

      <div className="kpi-grid">
        {kpiConfig.map(({ key, label, type, icon, iconBg }) => (
          <KpiCard
            key={key}
            label={label}
            value={kpiData[key].value}
            change={kpiData[key].change}
            type={type}
            icon={icon}
            iconBg={iconBg}
          />
        ))}
      </div>

      <div className="charts-row">
        <SalesChart data={monthlySales} />
        <CategoryChart data={categoryData} />
      </div>
    </>
  )
}
