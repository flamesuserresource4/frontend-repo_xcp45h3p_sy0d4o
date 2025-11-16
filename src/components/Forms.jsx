import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Input({ label, type = 'text', value, onChange, ...props }) {
  return (
    <label className="block text-sm mb-3">
      <span className="text-gray-600 mb-1 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </label>
  )
}

function NumberInput(props) {
  return <Input type="number" step="any" {...props} />
}

function DateInput(props) {
  return <Input type="date" {...props} />
}

function Section({ title, children, onSubmit, submitLabel }) {
  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit && onSubmit() }}
      className="bg-white/80 backdrop-blur p-5 rounded-2xl border border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{submitLabel || 'Save'}</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </form>
  )
}

export default function Forms() {
  // Inward form state
  const [inward, setInward] = useState({ date: '', material_name: '', quantity: '', unit_cost: '', supplier: '' })
  const saveInward = async () => {
    const res = await fetch(`${API_BASE}/api/inwards`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...inward, quantity: parseFloat(inward.quantity||0), unit_cost: parseFloat(inward.unit_cost||0) }) })
    if (res.ok) alert('Inward saved')
  }

  // Production form state
  const [prod, setProd] = useState({ date: '', product: 'briquette', quantity_produced: '' })
  const saveProd = async () => {
    const res = await fetch(`${API_BASE}/api/production`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...prod, quantity_produced: parseFloat(prod.quantity_produced||0) }) })
    if (res.ok) alert('Production saved')
  }

  // Sale form state
  const [sale, setSale] = useState({ date: '', customer: '', quantity_sold: '', unit_price: '' })
  const saveSale = async () => {
    const res = await fetch(`${API_BASE}/api/sales`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...sale, quantity_sold: parseFloat(sale.quantity_sold||0), unit_price: parseFloat(sale.unit_price||0) }) })
    if (res.ok) alert('Sale saved')
  }

  // Expense form state
  const [exp, setExp] = useState({ date: '', category: '', amount: '' })
  const saveExp = async () => {
    const res = await fetch(`${API_BASE}/api/expenses`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...exp, amount: parseFloat(exp.amount||0) }) })
    if (res.ok) alert('Expense saved')
  }

  return (
    <div className="space-y-6">
      <Section title="Add Inward (Raw Material In)" onSubmit={saveInward} submitLabel="Save Inward">
        <DateInput label="Date" value={inward.date} onChange={v => setInward(s => ({ ...s, date: v }))} />
        <Input label="Material" value={inward.material_name} onChange={v => setInward(s => ({ ...s, material_name: v }))} />
        <NumberInput label="Quantity" value={inward.quantity} onChange={v => setInward(s => ({ ...s, quantity: v }))} />
        <NumberInput label="Unit Cost" value={inward.unit_cost} onChange={v => setInward(s => ({ ...s, unit_cost: v }))} />
        <Input label="Supplier" value={inward.supplier} onChange={v => setInward(s => ({ ...s, supplier: v }))} />
        <Input label="Notes" value={inward.notes||''} onChange={v => setInward(s => ({ ...s, notes: v }))} />
      </Section>

      <Section title="Add Production" onSubmit={saveProd} submitLabel="Save Production">
        <DateInput label="Date" value={prod.date} onChange={v => setProd(s => ({ ...s, date: v }))} />
        <Input label="Product" value={prod.product} onChange={v => setProd(s => ({ ...s, product: v }))} />
        <NumberInput label="Quantity Produced" value={prod.quantity_produced} onChange={v => setProd(s => ({ ...s, quantity_produced: v }))} />
        <Input label="Notes" value={prod.notes||''} onChange={v => setProd(s => ({ ...s, notes: v }))} />
      </Section>

      <Section title="Add Sale (Outward)" onSubmit={saveSale} submitLabel="Save Sale">
        <DateInput label="Date" value={sale.date} onChange={v => setSale(s => ({ ...s, date: v }))} />
        <Input label="Customer" value={sale.customer} onChange={v => setSale(s => ({ ...s, customer: v }))} />
        <NumberInput label="Quantity Sold" value={sale.quantity_sold} onChange={v => setSale(s => ({ ...s, quantity_sold: v }))} />
        <NumberInput label="Unit Price" value={sale.unit_price} onChange={v => setSale(s => ({ ...s, unit_price: v }))} />
        <Input label="Notes" value={sale.notes||''} onChange={v => setSale(s => ({ ...s, notes: v }))} />
      </Section>

      <Section title="Add Expense" onSubmit={saveExp} submitLabel="Save Expense">
        <DateInput label="Date" value={exp.date} onChange={v => setExp(s => ({ ...s, date: v }))} />
        <Input label="Category" value={exp.category} onChange={v => setExp(s => ({ ...s, category: v }))} />
        <NumberInput label="Amount" value={exp.amount} onChange={v => setExp(s => ({ ...s, amount: v }))} />
        <Input label="Notes" value={exp.notes||''} onChange={v => setExp(s => ({ ...s, notes: v }))} />
      </Section>
    </div>
  )
}
