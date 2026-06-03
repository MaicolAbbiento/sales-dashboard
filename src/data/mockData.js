export const ALL_MONTHS = [
  { month: 'Gen', vendite: 42000, ordini: 134, target: 40000 },
  { month: 'Feb', vendite: 38500, ordini: 118, target: 40000 },
  { month: 'Mar', vendite: 51200, ordini: 162, target: 45000 },
  { month: 'Apr', vendite: 47800, ordini: 149, target: 45000 },
  { month: 'Mag', vendite: 55300, ordini: 175, target: 50000 },
  { month: 'Giu', vendite: 61000, ordini: 192, target: 50000 },
  { month: 'Lug', vendite: 58700, ordini: 183, target: 55000 },
  { month: 'Ago', vendite: 49200, ordini: 154, target: 55000 },
  { month: 'Set', vendite: 63400, ordini: 198, target: 60000 },
  { month: 'Ott', vendite: 71000, ordini: 221, target: 60000 },
  { month: 'Nov', vendite: 68500, ordini: 214, target: 65000 },
  { month: 'Dic', vendite: 79200, ordini: 248, target: 70000 },
]

// Moltiplicatori per simulare dati per venditore
const venditoreMult = {
  tutti: 1,
  mario:  0.32,
  giulia: 0.28,
  luca:   0.22,
  sara:   0.18,
}

// Moltiplicatori per categoria
const categoriaMult = {
  tutte:         1,
  elettronica:   0.35,
  abbigliamento: 0.22,
  casa:          0.18,
  sport:         0.15,
}

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
  { value: 'q1', label: 'Q1', months: [0, 1, 2] },
  { value: 'q2', label: 'Q2', months: [3, 4, 5] },
  { value: 'q3', label: 'Q3', months: [6, 7, 8] },
  { value: 'q4', label: 'Q4', months: [9, 10, 11] },
  { value: 'h1', label: 'H1', months: [0, 1, 2, 3, 4, 5] },
  { value: 'h2', label: 'H2', months: [6, 7, 8, 9, 10, 11] },
  { value: 'ytd', label: 'Anno', months: [0,1,2,3,4,5,6,7,8,9,10,11] },
]

export const categoryData = [
  { name: 'Elettronica',    value: 35 },
  { name: 'Abbigliamento',  value: 22 },
  { name: 'Casa & Giardino',value: 18 },
  { name: 'Sport',          value: 15 },
  { name: 'Altro',          value: 10 },
]

export function filterData({ periodo, venditore, categoria }) {
  const periodoConf = PERIODI.find(p => p.value === periodo) ?? PERIODI[6]
  const vm = venditoreMult[venditore] ?? 1
  const cm = categoriaMult[categoria] ?? 1
  const mult = venditore === 'tutti' && categoria === 'tutte' ? 1 : vm * (categoria === 'tutte' ? 1 : cm / (vm || 1))
  const factor = venditore === 'tutti' ? (categoria === 'tutte' ? 1 : categoriaMult[categoria]) : vm

  const monthlySales = periodoConf.months.map(i => ({
    ...ALL_MONTHS[i],
    vendite: Math.round(ALL_MONTHS[i].vendite * factor),
    ordini:  Math.round(ALL_MONTHS[i].ordini  * factor),
    target:  Math.round(ALL_MONTHS[i].target  * factor),
  }))

  const totaleVendite = monthlySales.reduce((s, r) => s + r.vendite, 0)
  const ordiniTotali  = monthlySales.reduce((s, r) => s + r.ordini, 0)

  return {
    monthlySales,
    kpiData: {
      totaleVendite: { value: totaleVendite, change: +(Math.random() * 20 - 5).toFixed(1) },
      ordiniTotali:  { value: ordiniTotali,  change: +(Math.random() * 20 - 5).toFixed(1) },
      clientiAttivi: { value: Math.round(342 * factor), change: +(Math.random() * 15 - 3).toFixed(1) },
      valoreMedio:   { value: ordiniTotali ? Math.round(totaleVendite / ordiniTotali) : 0, change: +(Math.random() * 10 - 2).toFixed(1) },
    },
  }
}
