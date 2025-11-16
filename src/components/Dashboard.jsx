import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Stat({ label, value, subtitle }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  )
}

function Section({ title, children, action }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function Dashboard() {
  const [kpi, setKpi] = useState({ total_sales: 0, total_expenses: 0, profit: 0 })
  const [inwards, setInwards] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/api/kpi/profit`).then(r => r.json()).then(setKpi).catch(()=>{})
    fetch(`${API_BASE}/api/inwards`).then(r => r.json()).then(setInwards).catch(()=>{})
    fetch(`${API_BASE}/api/sales`).then(r => r.json()).then(setSales).catch(()=>{})
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Total Sales" value={`₹ ${kpi.total_sales.toFixed(2)}`} />
        <Stat label="Total Expenses" value={`₹ ${kpi.total_expenses.toFixed(2)}`} />
        <Stat label="Profit" value={`₹ ${kpi.profit.toFixed(2)}`} subtitle={kpi.profit >= 0 ? 'Profit' : 'Loss'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Recent Inward">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Date</th>
                  <th className="py-2">Material</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Unit Cost</th>
                </tr>
              </thead>
              <tbody>
                {inwards.slice(-5).reverse().map((i, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{i.date}</td>
                    <td className="py-2">{i.material_name}</td>
                    <td className="py-2">{i.quantity}</td>
                    <td className="py-2">₹ {i.unit_cost}</td>
                  </tr>
                ))}
                {inwards.length === 0 && (
                  <tr><td className="py-3 text-gray-400" colSpan={4}>No entries yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Recent Sales">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Date</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(-5).reverse().map((s, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{s.date}</td>
                    <td className="py-2">{s.customer || '-'}</td>
                    <td className="py-2">{s.quantity_sold}</td>
                    <td className="py-2">₹ {s.unit_price}</td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr><td className="py-3 text-gray-400" colSpan={4}>No sales yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  )
}
