import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./components/Navbar";
import SalesForm from "./components/SalesForm";
import SalesCard from "./components/SalesCard";

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
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get("/sales");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => d.store),
    datasets: [
      {
        label: "Sales",
        data: data.map((d) => d.sales),
        backgroundColor: "rgba(59,130,246,0.6)"
      }
    ]
  };

  const totalSales = data.reduce(
    (sum,item)=>sum+item.sales,
    0
  );

  const totalStores = data.length;

  const highestSales =
  data.length>0
  ? Math.max(...data.map((d)=>d.sales))
  :0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6">
        <SalesForm refresh={fetchData} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-gray-500">Total Sales</h2>
    <p className="text-3xl font-bold">
      ₹{totalSales}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-gray-500">Total Stores</h2>
    <p className="text-3xl font-bold">
      {totalStores}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-gray-500">Highest Sales</h2>
    <p className="text-3xl font-bold">
      ₹{highestSales}
    </p>
  </div>

</div>

        <SalesCard
  data={data}
  refresh={fetchData}
/>
        <div className="bg-white p-4 mt-6 rounded-xl shadow w-full md:w-3/4 mx-auto h-[400px]">
  <Bar
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false
    }}
  />
</div>
      </div>
    </div>

    
  );
}

export default App;