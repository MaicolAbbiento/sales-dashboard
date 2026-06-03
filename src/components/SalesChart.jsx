import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="item">
          <span className="dot" style={{ background: p.color }} />
          {p.name}: <strong>€{p.value.toLocaleString('it-IT')}</strong>
        </div>
      ))}
    </div>
  )
}

export default function SalesChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Andamento Vendite</div>
          <div className="chart-subtitle">Vendite mensili vs target — anno corrente</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradVendite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 12 }}
            formatter={(name) => name === 'vendite' ? 'Vendite' : 'Target'}
          />
          <Area
            type="monotone"
            dataKey="target"
            name="target"
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            fill="url(#gradTarget)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="vendite"
            name="vendite"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#gradVendite)"
            dot={false}
            activeDot={{ r: 4, fill: '#6366f1' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
