import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="toast">
      <CheckCircle size={15} />
      {message}
    </div>
  )
}
