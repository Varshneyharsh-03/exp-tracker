import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "" });

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/expenses", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ title: "", amount: "", category: "" });
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Expense Dashboard</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 flex-1"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 w-24"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-32"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <ul>
        {expenses.map((e) => (
          <li key={e._id} className="border-b py-2 flex justify-between">
            <span>
              {e.title} - ₹{e.amount} ({e.category})
            </span>
            <button
              className="text-red-500"
              onClick={async () => {
                await axios.delete(
                  `http://localhost:5000/api/expenses/${e._id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                fetchExpenses();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
