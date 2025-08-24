import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategoryChart from "./components/Chart";

const API = "http://localhost:8000";

function App() {
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/expenses/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setExpenses)
      .catch(console.error);
  }, [token]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>Smart Expense Tracker</h1>
      <AuthHelp />
      <ExpenseForm setExpenses={setExpenses} />
      <ExpenseList expenses={expenses} />
      <CategoryChart expenses={expenses} />
    </div>
  );
}

function AuthHelp() {
  return (
    <details style={{ marginBottom: 16 }}>
      <summary>How to login (JWT)</summary>
      <ol>
        <li>Create a Django superuser.</li>
        <li>POST username & password to <code>/api/auth/token/</code>.</li>
        <li>Save <code>access</code> token to <code>localStorage</code> key <code>access</code>.</li>
      </ol>
    </details>
  );
}

export default App;
