import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { VENDITORI, CATEGORIE } from '../data/mockData'

const EMPTY = {
  prodotto:  '',
  importo:   '',
  venditore: '',
  categoria: '',
  data:      new Date().toISOString().slice(0, 10),
  note:      '',
}

function validate(form) {
  const errors = {}
  if (!form.prodotto.trim())       errors.prodotto  = 'Campo obbligatorio'
  if (!form.importo || isNaN(Number(form.importo)) || Number(form.importo) <= 0)
                                   errors.importo   = 'Importo non valido'
  if (!form.venditore)             errors.venditore = 'Seleziona un venditore'
  if (!form.categoria)             errors.categoria = 'Seleziona una categoria'
  if (!form.data)                  errors.data      = 'Campo obbligatorio'
  return errors
}

export default function AddSaleModal({ onClose, onSave }) {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})

  function set(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({
      ...form,
      importo: Number(form.importo),
      id: Date.now(),
    })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <span className="modal-title" id="modal-title">Nuova vendita</span>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi"><X size={14} /></button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-field full">
                <label className="form-label">Prodotto / Descrizione</label>
                <input
                  className={`form-input${errors.prodotto ? ' error' : ''}`}
                  placeholder="es. MacBook Pro 14"
                  value={form.prodotto}
                  onChange={e => set('prodotto', e.target.value)}
                />
                {errors.prodotto && <span className="form-error">{errors.prodotto}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Importo (€)</label>
                <input
                  className={`form-input${errors.importo ? ' error' : ''}`}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.importo}
                  onChange={e => set('importo', e.target.value)}
                />
                {errors.importo && <span className="form-error">{errors.importo}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Data</label>
                <input
                  className={`form-input${errors.data ? ' error' : ''}`}
                  type="date"
                  value={form.data}
                  onChange={e => set('data', e.target.value)}
                />
                {errors.data && <span className="form-error">{errors.data}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Venditore</label>
                <select
                  className={`form-select${errors.venditore ? ' error' : ''}`}
                  value={form.venditore}
                  onChange={e => set('venditore', e.target.value)}
                >
                  <option value="">Seleziona…</option>
                  {VENDITORI.filter(v => v.value !== 'tutti').map(v => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>
                {errors.venditore && <span className="form-error">{errors.venditore}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Categoria</label>
                <select
                  className={`form-select${errors.categoria ? ' error' : ''}`}
                  value={form.categoria}
                  onChange={e => set('categoria', e.target.value)}
                >
                  <option value="">Seleziona…</option>
                  {CATEGORIE.filter(c => c.value !== 'tutte').map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                {errors.categoria && <span className="form-error">{errors.categoria}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Note (opzionale)</label>
              <input
                className="form-input"
                placeholder="Informazioni aggiuntive…"
                value={form.note}
                onChange={e => set('note', e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Annulla</button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle size={14} />
              Salva vendita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
