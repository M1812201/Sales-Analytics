import { useState } from "react";
import API from "../api";

export default function SalesCard({ data, refresh }) {

  const [editId, setEditId] = useState(null);
  const [newStore, setNewStore] = useState("");
  const [newSales, setNewSales] = useState("");

  // DELETE
  const deleteData = async (id) => {
    try {

      await API.delete(`/sales/${id}`);

      refresh();

    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const editData = async (id) => {
    try {

      await API.put(`/sales/${id}`, {
        store: newStore,
        sales: Number(newSales)
      });

      setEditId(null);

      refresh();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {data.map((item) => (

        <div
          key={item._id}
          className="bg-white p-4 rounded-xl shadow"
        >

          {editId === item._id ? (

            <>
              <input
                type="text"
                value={newStore}
                onChange={(e) =>
                  setNewStore(e.target.value)
                }
                className="border p-2 rounded w-full mb-2"
              />

              <input
                type="number"
                value={newSales}
                onChange={(e) =>
                  setNewSales(e.target.value)
                }
                className="border p-2 rounded w-full mb-2"
              />

              <button
                onClick={() => editData(item._id)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>

            </>

          ) : (

            <>
              <h2 className="text-xl font-bold">
                {item.store}
              </h2>

              <p className="mt-2 text-gray-600">
                Sales: ₹{item.sales}
              </p>

              <button
                onClick={() => {
                  setEditId(item._id);
                  setNewStore(item.store);
                  setNewSales(item.sales);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => deleteData(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete
              </button>
            </>

          )}

        </div>

      ))}

    </div>
  );
}