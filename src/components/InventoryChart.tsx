import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { inventoryStatus } from '@/data/mockData';
import { InventoryStatus } from '@/types/dealership';

interface InventoryChartProps {
  data?: InventoryStatus[];
  isLoading?: boolean;
  className?: string;
}

export const InventoryChart = ({ 
  data = inventoryStatus, 
  isLoading = false,
  className = "" 
}: InventoryChartProps) => {
  type PiePayload = {
    payload: InventoryStatus
    color: string
  }
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: PiePayload[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.status}</p>
          <p className="text-sm text-muted-foreground">{data.count} vehicles</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number }) => {
    if (percent < 0.05) return null; // Don't show label for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className={`card-automotive p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-32 mb-4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-automotive p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Inventory Status</h3>
        <p className="text-sm text-muted-foreground">Current vehicle availability</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value: string, entry: PiePayload) => (
                <span style={{ color: entry.color, fontWeight: 500 }}>
                  {value} ({entry.payload.count})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};