export const MONTH_LABELS = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic']

// Target mensili statici (obiettivi aziendali, non dipendono dalle vendite)
export const MONTHLY_TARGETS = [40000,40000,45000,45000,50000,50000,55000,55000,60000,60000,65000,70000]

export const VENDITORI = [
  { value: 'tutti',  label: 'Tutti i venditori' },
  { value: 'mario',  label: 'Mario Rossi' },
  { value: 'giulia', label: 'Giulia Bianchi' },
  { value: 'luca',   label: 'Luca Verdi' },
  { value: 'sara',   label: 'Sara Neri' },
]

export const CATEGORIE = [
  { value: 'tutte',         label: 'Tutte le categorie' },
  { value: 'elettronica',   label: 'Elettronica' },
  { value: 'abbigliamento', label: 'Abbigliamento' },
  { value: 'casa',          label: 'Casa & Giardino' },
  { value: 'sport',         label: 'Sport' },
]

export const PERIODI = [
  { value: 'q1',  label: 'Q1',  months: [0,1,2] },
  { value: 'q2',  label: 'Q2',  months: [3,4,5] },
  { value: 'q3',  label: 'Q3',  months: [6,7,8] },
  { value: 'q4',  label: 'Q4',  months: [9,10,11] },
  { value: 'h1',  label: 'H1',  months: [0,1,2,3,4,5] },
  { value: 'h2',  label: 'H2',  months: [6,7,8,9,10,11] },
  { value: 'ytd', label: 'Anno', months: [0,1,2,3,4,5,6,7,8,9,10,11] },
]

// Aggrega le vendite reali in base ai filtri attivi
export function filterData({ periodo, venditore, categoria }, sales = []) {
  const periodoConf = PERIODI.find(p => p.value === periodo) ?? PERIODI[6]

  // Filtra le vendite
  const filtered = sales.filter(s => {
    if (venditore !== 'tutti' && s.venditore !== venditore) return false
    if (categoria !== 'tutte' && s.categoria !== categoria) return false
    const m = new Date(s.data).getMonth()
    return periodoConf.months.includes(m)
  })

  // Aggrega per mese
  const monthlySales = periodoConf.months.map(i => {
    const inMonth = filtered.filter(s => new Date(s.data).getMonth() === i)
    return {
      month:   MONTH_LABELS[i],
      vendite: Math.round(inMonth.reduce((sum, s) => sum + Number(s.importo), 0)),
      ordini:  inMonth.length,
      target:  MONTHLY_TARGETS[i],
    }
  })

  const totaleVendite = filtered.reduce((sum, s) => sum + Number(s.importo), 0)
  const ordiniTotali  = filtered.length
  const valoreMedio   = ordiniTotali ? Math.round(totaleVendite / ordiniTotali) : 0

  // Clienti unici per venditore (usiamo venditore come proxy)
  const clientiUnici = new Set(filtered.map(s => s.venditore)).size

  // Donut categorie — percentuale per importo
  const catTotals = {}
  filtered.forEach(s => {
    catTotals[s.categoria] = (catTotals[s.categoria] ?? 0) + Number(s.importo)
  })
  const catEntries = CATEGORIE.filter(c => c.value !== 'tutte')
  const catData = totaleVendite > 0
    ? catEntries
        .map(c => ({ name: c.label, value: Math.round(((catTotals[c.value] ?? 0) / totaleVendite) * 100) }))
        .filter(c => c.value > 0)
    : catEntries.map(c => ({ name: c.label, value: Math.round(100 / catEntries.length) }))

  return {
    monthlySales,
    catData,
    kpiData: {
      totaleVendite: { value: Math.round(totaleVendite), change: 0 },
      ordiniTotali:  { value: ordiniTotali, change: 0 },
      clientiAttivi: { value: clientiUnici, change: 0 },
      valoreMedio:   { value: valoreMedio, change: 0 },
    },
  }
}
