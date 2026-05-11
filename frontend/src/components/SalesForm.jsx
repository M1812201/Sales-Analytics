import { useState } from "react";
import API from "../api";

export default function SalesForm({ refresh }) {
  const [store, setStore] = useState("");
  const [sales, setSales] = useState("");

  const handleSubmit = async () => {
    if (!store || !sales) return;

    await API.post("/sales", {
      store,
      sales: Number(sales)
    });

    setStore("");
    setSales("");
    refresh();
  };

  return (
    <div className="bg-white p-4 shadow rounded-xl mb-4 flex gap-2">
      <input
        value={store}
        onChange={(e) => setStore(e.target.value)}
        placeholder="Store"
        className="border p-2 rounded w-full"
      />

      <input
        value={sales}
        onChange={(e) => setSales(e.target.value)}
        placeholder="Sales"
        className="border p-2 rounded w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}