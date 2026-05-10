import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  // state
  const [salesData, setSalesData] = useState([]);
  const [store, setStore] = useState("");
  const [sales, setSales] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://backend-api-fcni.onrender.com";

  // fetch data
  const fetchData = () => {
    axios
      .get(`${API_URL}/sales`)
      .then((res) => {
        setSalesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // add data
  const addSales = () => {
    if (!store || !sales) return;

    axios
      .post(`${API_URL}/sales`, {
        store,
        sales: Number(sales)
      })
      .then(() => {
        setStore("");
        setSales("");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // chart data
  const chartData = {
    labels: salesData.map((item) => item.store),
    datasets: [
      {
        label: "Store Sales (₹)",
        data: salesData.map((item) => item.sales),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Analytics Dashboard" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Sales Analytics Dashboard
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Sales Data</h2>

        <input
          type="text"
          placeholder="Store Name"
          value={store}
          className="border p-2 mr-2"
          onChange={(e) => setStore(e.target.value)}
        />

        <input
          type="number"
          placeholder="Sales"
          value={sales}
          className="border p-2 mr-2"
          onChange={(e) => setSales(e.target.value)}
        />

        <button
          onClick={addSales}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* STATUS */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* CONTENT */}
      {!loading && !error && (
        <>
          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {salesData.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold">{item.store}</h2>
                <p className="text-xl mt-2">Sales: ₹{item.sales}</p>
              </div>
            ))}
          </div>

          {/* CHART */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Bar data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;