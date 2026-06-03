import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Placeholder from './components/Placeholder'
import './styles/global.css'
import './styles/layout.css'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  function handleAddSale() {
    // il modal arriverà nel Pezzo 4
    console.log('Apri modal nuova vendita')
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-area">
        <Header activePage={activePage} onAddSale={handleAddSale} />
        <main className="page-content">
          <Placeholder page={activePage} />
        </main>
      </div>
    </div>
  )
}
