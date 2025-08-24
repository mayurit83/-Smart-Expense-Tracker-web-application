import React, { useState } from "react";

const API = "http://localhost:8000";

export default function ExpenseForm({ setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));

  const token = localStorage.getItem("access");

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/expenses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount, category, date }),
    });
    const data = await res.json();
    setExpenses((prev) => [...prev, data]);
    setTitle(""); setAmount(""); setCategory("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" step="0.01" required />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
      <button type="submit">Add</button>
    </form>
  );
}
