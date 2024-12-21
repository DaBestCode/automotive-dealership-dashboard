import { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { SalesChart as SalesChartType } from '@/types/dealership';
import { salesChartData } from '@/data/mockData';

interface SalesChartProps {
  data?: SalesChartType[];
  isLoading?: boolean;
  className?: string;
}

export const SalesChart = ({ 
  data = salesChartData, 
  isLoading = false,
  className = "" 
}: SalesChartProps) => {
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year'>('month');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  type TooltipEntry = { name: string; value: number; color: string }
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: TooltipEntry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' || entry.name === 'Target' 
                ? formatCurrency(entry.value) 
                : `${entry.value} units`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={`card-automotive p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="h-80 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-automotive p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Sales Performance</h3>
          <p className="text-sm text-muted-foreground">Monthly sales data with revenue targets</p>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex space-x-1 mt-4 sm:mt-0">
          {(['week', 'month', 'year'] as const).map((period) => (
            <Button
              key={period}
              variant={timePeriod === period ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimePeriod(period)}
              className="capitalize"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar 
              yAxisId="left"
              dataKey="sales" 
              name="Units Sold"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="revenue" 
              name="Revenue"
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 5 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="target" 
              name="Target"
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              strokeDasharray="8 8"
              dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};