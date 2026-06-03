import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const db = new Database(join(__dir, 'sales.db'))

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS sales (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    prodotto   TEXT    NOT NULL,
    importo    REAL    NOT NULL,
    venditore  TEXT    NOT NULL,
    categoria  TEXT    NOT NULL,
    data       TEXT    NOT NULL,
    note       TEXT    DEFAULT '',
    created_at TEXT    DEFAULT (datetime('now'))
  )
`)

export const getSales = () =>
  db.prepare('SELECT * FROM sales ORDER BY created_at DESC').all()

export const getSaleById = (id) =>
  db.prepare('SELECT * FROM sales WHERE id = ?').get(id)

export const insertSale = (sale) => {
  const stmt = db.prepare(`
    INSERT INTO sales (prodotto, importo, venditore, categoria, data, note)
    VALUES (@prodotto, @importo, @venditore, @categoria, @data, @note)
  `)
  const { lastInsertRowid } = stmt.run(sale)
  return getSaleById(lastInsertRowid)
}

export const deleteSale = (id) =>
  db.prepare('DELETE FROM sales WHERE id = ?').run(id)

export default db
