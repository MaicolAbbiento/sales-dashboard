import { TrendingUp, TrendingDown } from 'lucide-react'

function formatValue(value, type) {
  if (type === 'currency') return '€' + value.toLocaleString('it-IT')
  if (type === 'number') return value.toLocaleString('it-IT')
  return value
}

export default function KpiCard({ label, value, change, type = 'number', icon: Icon, iconBg }) {
  const isUp = change >= 0

  return (
    <div className="kpi-card">
      <div className="kpi-card-top">
        <span className="kpi-label">{label}</span>
        <div className="kpi-icon" style={{ background: iconBg }}>
          <Icon size={17} color="#fff" />
        </div>
      </div>
      <div className="kpi-value">{formatValue(value, type)}</div>
      <div className="kpi-footer">
        <span className={`kpi-badge ${isUp ? 'up' : 'down'}`}>
          {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isUp ? '+' : ''}{change}%
        </span>
        <span>vs mese scorso</span>
      </div>
    </div>
  )
}
