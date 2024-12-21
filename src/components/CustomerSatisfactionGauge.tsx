import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Star } from 'lucide-react';

interface CustomerSatisfactionGaugeProps {
  rating?: number;
  isLoading?: boolean;
  className?: string;
}

export const CustomerSatisfactionGauge = ({ 
  rating = 4.8, 
  isLoading = false,
  className = "" 
}: CustomerSatisfactionGaugeProps) => {
  const percentage = (rating / 5) * 100;
  
  // Data for the gauge chart
  const data = [
    { name: 'Filled', value: percentage },
    { name: 'Empty', value: 100 - percentage },
  ];

  const colors = ['hsl(var(--success))', 'hsl(var(--muted))'];

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className={`card-automotive p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-36 mb-4"></div>
          <div className="h-32 bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-automotive p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Customer Satisfaction</h3>
        <p className="text-sm text-muted-foreground">Average rating this month</p>
      </div>

      {/* Gauge Chart */}
      <div className="relative h-32 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={40}
              outerRadius={60}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Central Rating Display */}
        <div className="absolute inset-0 flex items-center justify-center pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{rating}</div>
            <div className="text-sm text-muted-foreground">out of 5</div>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center justify-center space-x-1 mb-2">
        {renderStars()}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Based on {Math.floor(Math.random() * 200 + 150)} reviews
        </p>
      </div>
    </div>
  );
};