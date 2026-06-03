import { VENDITORI, CATEGORIE } from '../data/mockData'

const vendLabel = v => VENDITORI.find(x => x.value === v)?.label ?? v
const catLabel  = c => CATEGORIE.find(x => x.value === c)?.label ?? c

export default function RecentSales({ sales }) {
  if (!sales.length) return null

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Vendite inserite</div>
          <div className="chart-subtitle">{sales.length} record in questa sessione</div>
        </div>
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
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id}>
                <td>{s.prodotto}</td>
                <td className="td-amount">€{s.importo.toLocaleString('it-IT')}</td>
                <td>{vendLabel(s.venditore)}</td>
                <td>{catLabel(s.categoria)}</td>
                <td>{new Date(s.data).toLocaleDateString('it-IT')}</td>
                <td className="td-note">{s.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
