import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  suffix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: {
    value: number;
    max: number;
    color?: string;
  };
  icon: LucideIcon;
  iconColor?: string;
  isLoading?: boolean;
  className?: string;
}

export const MetricCard = ({
  title,
  subtitle,
  value,
  suffix,
  trend,
  progress,
  icon: Icon,
  iconColor = 'bg-primary',
  isLoading = false,
  className,
}: MetricCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const progressPercentage = progress ? (progress.value / progress.max) * 100 : 0;

  if (isLoading) {
    return (
      <div className={cn("metric-card animate-pulse", className)}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="h-4 bg-muted rounded w-24 mb-2"></div>
            {subtitle && <div className="h-3 bg-muted rounded w-16"></div>}
          </div>
          <div className="w-12 h-12 bg-muted rounded-xl"></div>
        </div>
        <div className="h-8 bg-muted rounded w-20 mb-3"></div>
        <div className="h-4 bg-muted rounded w-16"></div>
      </div>
    );
  }

  return (
    <div className={cn("metric-card group", className)}>
      {/* Header with Title and Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-1 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground/80">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
          iconColor === 'bg-primary' && 'gradient-primary',
          iconColor === 'bg-success' && 'gradient-success',
          iconColor === 'bg-destructive' && 'gradient-destructive',
          iconColor === 'bg-secondary' && 'bg-secondary'
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main Value */}
      <div className="mb-3">
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-foreground">
            {formatValue(value)}
          </span>
          {suffix && (
            <span className="text-lg font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Trend and Progress */}
      <div className="space-y-3">
        {trend && (
          <div className={cn(
            "inline-flex items-center space-x-1",
            trend.isPositive ? "stat-trend-up" : "stat-trend-down"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}

        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={cn(
                  "progress-fill",
                  progress.color === 'success' && 'gradient-success',
                  progress.color === 'primary' && 'gradient-primary',
                  progress.color === 'destructive' && 'gradient-destructive',
                  !progress.color && 'gradient-primary'
                )}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};