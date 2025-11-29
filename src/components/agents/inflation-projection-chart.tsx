"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const projectionData = Array.from({ length: 10 }).map((_, index) => {
  const day = index + 1;
  const predicted = 2.3 + Math.sin(index / 1.8) * 0.3 + day * 0.02;
  const target = 2.4;
  return {
    day: `Day ${day}`,
    predicted: parseFloat(predicted.toFixed(2)),
    target,
  };
});

export function InflationProjectionChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={projectionData} margin={{ left: 0, right: 16, top: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="purpleLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4318FF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#4318FF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E9EDF7" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#A3AED0", fontSize: 12 }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#A3AED0", fontSize: 12 }}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            domain={[2, 3.2]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0px 25px 50px rgba(15, 23, 42, 0.15)",
            }}
            labelClassName="text-[#A3AED0]"
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)}%`,
              name === "predicted" ? "Predicted Inflation" : "Target Threshold",
            ]}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#4318FF"
            strokeWidth={3}
            dot={{ stroke: "#4318FF", strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#6AD2FF"
            strokeDasharray="6 6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
