'use client';

import { Chart } from '@/components/chart';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function TimerPieChart({ data }: { data: { name: string; value: number }[] }) {
  const COLORS = ['#00FFAA', '#00D2FF', '#FF8A00', '#FF4D4D', '#AA00FF', '#0099FF'];

  return (
    <div className="w-full max-w-md h-[300px] bg-neutral-900 rounded-xl p-4">
      <h2 className="text-center mb-4 font-semibold text-white">Time Spent by Project</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
