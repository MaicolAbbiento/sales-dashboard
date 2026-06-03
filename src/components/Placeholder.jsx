export default function Placeholder({ page }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'var(--color-text-muted)',
      fontSize: '15px',
      fontWeight: 500,
    }}>
      Sezione <strong style={{ margin: '0 6px', color: 'var(--color-text)' }}>{page}</strong> — in arrivo nel prossimo pezzo
    </div>
  )
}
