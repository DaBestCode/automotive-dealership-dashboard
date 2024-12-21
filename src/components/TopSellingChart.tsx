import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { topSellingModels } from '@/data/mockData';
import { TopSellingModel } from '@/types/dealership';

interface TopSellingChartProps {
  data?: TopSellingModel[];
  isLoading?: boolean;
  className?: string;
}

export const TopSellingChart = ({ 
  data = topSellingModels, 
  isLoading = false,
  className = "" 
}: TopSellingChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  type TooltipPayload = { payload: TopSellingModel }
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-foreground mb-2">{data.brand} {data.model}</p>
          <p className="text-sm text-muted-foreground">Units Sold: {data.unitsSold}</p>
          <p className="text-sm text-muted-foreground">Revenue: {formatCurrency(data.revenue)}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={`card-automotive p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-40 mb-4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-automotive p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Top Selling Models</h3>
        <p className="text-sm text-muted-foreground">Best performing vehicles this month</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="model" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="unitsSold" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};