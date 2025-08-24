import React from "react";

export default function ExpenseList({ expenses }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="right">Amount</th>
          <th align="left">Category</th>
          <th align="left">Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.id}>
            <td>{e.title}</td>
            <td align="right">₹{Number(e.amount).toFixed(2)}</td>
            <td>{e.category}</td>
            <td>{e.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
