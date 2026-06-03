import { Trash2 } from 'lucide-react'
import { VENDITORI, CATEGORIE } from '../data/mockData'

const vendLabel = v => VENDITORI.find(x => x.value === v)?.label ?? v
const catLabel  = c => CATEGORIE.find(x => x.value === c)?.label ?? c

export default function RecentSales({ sales, apiOnline, onDelete }) {
  if (!sales.length) return null

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Vendite inserite</div>
          <div className="chart-subtitle">{sales.length} record</div>
        </div>
        {apiOnline !== null && (
          <span className={`api-badge ${apiOnline ? 'online' : 'offline'}`}>
            {apiOnline ? '● DB connesso' : '○ Solo memoria'}
          </span>
        )}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Prodotto</th>
              <th>Importo</th>
              <th>Venditore</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id}>
                <td>{s.prodotto}</td>
                <td className="td-amount">€{Number(s.importo).toLocaleString('it-IT')}</td>
                <td>{vendLabel(s.venditore)}</td>
                <td>{catLabel(s.categoria)}</td>
                <td>{new Date(s.data).toLocaleDateString('it-IT')}</td>
                <td className="td-note">{s.note || '—'}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(s.id)}
                    aria-label="Elimina vendita"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
