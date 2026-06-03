import { useState, useMemo } from 'react'
import { filterData } from '../data/mockData'

const DEFAULT = { periodo: 'ytd', venditore: 'tutti', categoria: 'tutte' }

export default function useFilters() {
  const [filters, setFilters] = useState(DEFAULT)

  const data = useMemo(() => filterData(filters), [filters])

  function setFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function reset() {
    setFilters(DEFAULT)
  }

  const isDirty = filters.periodo !== DEFAULT.periodo
    || filters.venditore !== DEFAULT.venditore
    || filters.categoria !== DEFAULT.categoria

  return { filters, setFilter, reset, isDirty, data }
}
