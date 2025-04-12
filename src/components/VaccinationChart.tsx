
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { name: 'Rhino Trachitis', count: 4 },
  { name: 'Lice Tablets', count: 3 },
];

const monthlyData = [
  { name: 'Rhino Trachitis', count: 12 },
  { name: 'Lice Tablets', count: 9 },
  { name: 'Rabies', count: 7 },
  { name: 'Parvo', count: 5 },
];

export function VaccinationChart() {
  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="clinic-card">
          <h3 className="text-lg font-semibold mb-4">Weekly Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={weeklyData}
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
              <Bar dataKey="count" name="Vaccines Given" fill="#4361ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinic-card">
          <h3 className="text-lg font-semibold mb-4">Monthly Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData}
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
              <Bar dataKey="count" name="Vaccines Given" fill="#8e44ad" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
