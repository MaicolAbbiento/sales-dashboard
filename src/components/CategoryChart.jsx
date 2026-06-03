import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="label">{payload[0].name}</div>
      <div className="item">
        <span className="dot" style={{ background: payload[0].payload.fill }} />
        {payload[0].value}%
      </div>
    </div>
  )
}

export default function CategoryChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Categorie</div>
          <div className="chart-subtitle">Distribuzione per categoria</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-legend">
        {data.map((entry, i) => (
          <div key={entry.name} className="donut-legend-item">
            <div className="donut-legend-left">
              <span className="donut-legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
              {entry.name}
            </div>
            <span className="donut-legend-pct">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
