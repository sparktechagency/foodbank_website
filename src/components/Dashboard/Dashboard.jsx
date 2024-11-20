import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 80 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 80 },
  { name: 'Aug', value: 100 },
];

const subscriptionData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 80 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 60 },
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 60 },
  { name: 'Oct', value: 60 },
  { name: 'Nov', value: 60 },
  { name: 'Dec', value: 60 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">Total Subscriber</h3>
          <p className="text-2xl font-bold">$8250</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">852,650</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">Total Creator</h3>
          <p className="text-2xl font-bold">52,650</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-700 font-bold">Income Overview</h3>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                2024
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>
          </Menu>
        </div>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
          className="w-full h-auto"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-gray-700 font-bold mb-4">Top Podcast</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">SL no.</th>
                <th className="px-4 py-2 border">Event Name</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">01</td>
                <td className="px-4 py-2 border">Classics Music</td>
                <td className="px-4 py-2 border">84</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">02</td>
                <td className="px-4 py-2 border">Millennial Comedy</td>
                <td className="px-4 py-2 border">67</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">03</td>
                <td className="px-4 py-2 border">Roman Catholic Church</td>
                <td className="px-4 py-2 border">52</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-700 font-bold">Subscription Overview</h3>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                2024
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>
          </Menu>
        </div>
        <BarChart
          width={600}
          height={300}
          data={subscriptionData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
          className="w-full h-auto"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
