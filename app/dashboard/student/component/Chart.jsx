"use client";

import { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Month 1",
    "tua media": 4000,
    "media classe": 2400,
  },
  {
    name: "Month 2",
    "tua media": 3000,
    "media classe": 1398,
  },
  {
    name: "Month 3",
    "tua media": 2000,
    "media classe": 9800,
  },
  {
    name: "Month 4",
    "tua media": 2780,
    "media classe": 3908,
  },
  {
    name: "Month 5",
    "tua media": 1890,
    "media classe": 4800,
  },
  {
    name: "Month 6",
    "tua media": 1890,
    "media classe": 4800,
  },
];

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/stacked-area-chart-forked-5yjhcs";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
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
            dataKey="tua media"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="media classe"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
