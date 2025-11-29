"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const completionData = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 148 },
  { day: "Wed", value: 133 },
  { day: "Thu", value: 172 },
  { day: "Fri", value: 160 },
  { day: "Sat", value: 141 },
  { day: "Sun", value: 190 },
];

export function QuestCompletionChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={completionData} barSize={22}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EDF7" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#A3AED0" }} />
          <Tooltip
            cursor={{ fill: "rgba(67,24,255,0.08)" }}
            contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0px 25px 50px rgba(15,23,42,0.1)" }}
            formatter={(value: number) => [`${value} quests`, "Completions"]}
          />
          <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="#4318FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
