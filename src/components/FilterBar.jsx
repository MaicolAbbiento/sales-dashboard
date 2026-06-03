import { RotateCcw } from 'lucide-react'
import { PERIODI, VENDITORI, CATEGORIE } from '../data/mockData'

export default function FilterBar({ filters, onFilter, onReset, isDirty }) {
  return (
    <div className="filter-bar">
      {/* Periodo */}
      <div className="period-toggle">
        {PERIODI.map(p => (
          <button
            key={p.value}
            className={`period-pill${filters.periodo === p.value ? ' active' : ''}`}
            onClick={() => onFilter('periodo', p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="filter-divider" />

      {/* Venditore */}
      <div className="filter-group">
        <span className="filter-label">Venditore</span>
        <select
          className="filter-select"
          value={filters.venditore}
          onChange={e => onFilter('venditore', e.target.value)}
        >
          {VENDITORI.map(v => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Categoria */}
      <div className="filter-group">
        <span className="filter-label">Categoria</span>
        <select
          className="filter-select"
          value={filters.categoria}
          onChange={e => onFilter('categoria', e.target.value)}
        >
          {CATEGORIE.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {isDirty && (
        <button className="filter-reset" onClick={onReset}>
          <RotateCcw size={12} />
          Reset
        </button>
      )}
    </div>
  )
}
