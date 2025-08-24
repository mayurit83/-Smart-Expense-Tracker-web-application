import React, { useMemo, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const API = "http://localhost:8000";

export default function CategoryChart({ expenses }) {
  const token = localStorage.getItem("access");
  const [agg, setAgg] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/expenses/summary_by_category/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setAgg);
  }, [expenses, token]);

  const data = useMemo(() => agg.map(item => ({
    name: item.category,
    value: Number(item.total)
  })), [agg]);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={110} label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
