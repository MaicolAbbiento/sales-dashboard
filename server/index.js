import express from 'express'
import cors from 'cors'
import { getSales, insertSale, deleteSale } from './db.js'

const app  = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// GET /api/sales
app.get('/api/sales', (_req, res) => {
  res.json(getSales())
})

// POST /api/sales
app.post('/api/sales', (req, res) => {
  const { prodotto, importo, venditore, categoria, data, note = '' } = req.body

  if (!prodotto || !importo || !venditore || !categoria || !data) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' })
  }
  if (typeof importo !== 'number' || importo <= 0) {
    return res.status(400).json({ error: 'Importo non valido' })
  }

  const sale = insertSale({ prodotto, importo, venditore, categoria, data, note })
  res.status(201).json(sale)
})

// DELETE /api/sales/:id
app.delete('/api/sales/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!id) return res.status(400).json({ error: 'ID non valido' })
  deleteSale(id)
  res.status(204).end()
})

app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
)
