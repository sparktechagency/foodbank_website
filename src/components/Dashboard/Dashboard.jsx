import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

import dash from "../../assets/routerImg/dash.png";

import suscriber from "../../assets/routerImg/suscriber.png";
import totalCreate from "../../assets/routerImg/totalCreate.png";
import totalUser from "../../assets/routerImg/totalUser.png";


const dataa = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 100 },
  { name: "May", value: 60 },
  { name: "Jun", value: 80 },
  { name: "Jul", value: 50 },
  { name: "Aug", value: 40 },
];

const data = [
  {
    name: "Jan",
    uv: 100,
    pv: 5400,
    amt: 400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Augst",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  return (
    <div className="p-2 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-16">
        <div className="bg-[#F4E9E9] p-4 rounded-xl shadow text-center">
          <h3 className="font-semibold">Total Subscriber</h3>
          <div className="flex justify-center my-2">
            <div className="bg-white p-2  rounded-full">
            <img className="" src={suscriber} alt="" />
            </div>
          </div>
          <p className="text-2xl font-bold">$8250</p>
        </div>
        <div className="bg-[#F4E9E9] p-4 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Total Users</h3>
          <div className="flex justify-center my-2">
          <div className="bg-white p-2  rounded-full">
            <img className="" src={totalUser} alt="" />
            </div>
          </div>
          <p className="text-2xl font-bold">852,650</p>
        </div>
        <div className="bg-[#F4E9E9] p-4 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Total Creator</h3>
          <div className="flex justify-center my-2">
          <div className="bg-white p-2  rounded-full">
            <img className="" src={totalCreate} alt="" />
            </div>
          </div>
          <p className="text-2xl font-bold">52,650</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#F4E9E9] rounded shadow">
          <div className="items-center mb-4">
            <h3 className="text-gray-700 font-bold pt-3 pl-7">Income Overview</h3>
            <div className="flex justify-end">
              <select
                className="border border-neutral-400 rounded -mt-5 p-2 px-4 bg-[#00000000] mr-11"
                name=""
                id=""
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>

          <ResponsiveContainer width="95%" height={300}>
            <AreaChart
              data={dataa}
              margin={{
                top: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#754744"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div>
            <div className="bg-[#F4E9E9] p-4 rounded shadow mb-6">
              <h3 className="text-gray-700 font-bold mb-4">Top Podcast</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">SL no.</th>
                      <th className="px-4 py-2">Event Name</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">01</td>
                      <td className="px-4 py-2 flex gap-2">
                        <img src={dash} alt="" />
                        <span className="mt-2">Classics Music</span>
                      </td>
                      <td className="px-4 py-2">84</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">02</td>
                      <td className="px-4 py-2 flex gap-2">
                        <img src={dash} alt="" />
                        <span className="mt-2">Classics Music</span>
                      </td>
                      <td className="px-4 py-2">67</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">03</td>
                      <td className="px-4 py-2 flex gap-2">
                        <img src={dash} alt="" />
                        <span className="mt-2">Classics Music</span>
                      </td>
                      <td className="px-4 py-2">52</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F4E9E9] shadow rounded">
        <div className="items-center mb-4">
          <h3 className="text-gray-700 font-bold pt-3 pl-7">
            Subscription Over View
          </h3>
          <div className="flex justify-end">
            <select
              className="border border-neutral-400 rounded -mt-5 p-2 px-4 bg-[#00000000] mr-11"
              name=""
              id=""
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#021526" background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
