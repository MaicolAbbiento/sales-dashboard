const BASE = 'http://localhost:3001/api'

export async function fetchSales() {
  const res = await fetch(`${BASE}/sales`)
  if (!res.ok) throw new Error('Errore nel caricamento vendite')
  return res.json()
}

export async function createSale(sale) {
  const res = await fetch(`${BASE}/sales`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(sale),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Errore nel salvataggio')
  }
  return res.json()
}

export async function deleteSale(id) {
  const res = await fetch(`${BASE}/sales/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Errore nella cancellazione')
}
