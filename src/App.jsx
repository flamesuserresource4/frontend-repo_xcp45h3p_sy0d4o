import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Forms from './components/Forms'

function Tab({ label, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function App() {
  const [tab, setTab] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-gray-800">Briquette Production Manager</div>
          <div className="space-x-2">
            {['Dashboard','Add Records'].map(l => (
              <Tab key={l} label={l} active={tab===l} onClick={() => setTab(l)} />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {tab === 'Dashboard' && <Dashboard />}
        {tab === 'Add Records' && <Forms />}
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-center text-xs text-gray-400">Designed for quick inward/outward tracking, costs, sales and profit.</footer>
    </div>
  )
}

export default App
