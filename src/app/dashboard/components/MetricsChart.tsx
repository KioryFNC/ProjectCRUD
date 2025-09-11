"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Produto A", vendas: 4000 },
  { name: "Produto B", vendas: 3000 },
  { name: "Produto C", vendas: 2000 },
  { name: "Produto D", vendas: 2780 },
  { name: "Produto E", vendas: 1890 },
  { name: "Produto F", vendas: 11000 },
];

export default function MetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="vendas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
