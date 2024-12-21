import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricCard } from '@/components/MetricCard';
import { SalesChart } from '@/components/SalesChart';
import { InventoryChart } from '@/components/InventoryChart';
import { TopSellingChart } from '@/components/TopSellingChart';
import { CustomerSatisfactionGauge } from '@/components/CustomerSatisfactionGauge';
import { dealershipMetrics } from '@/data/mockData';
import { 
  Car, 
  DollarSign, 
  Package, 
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader userName="John Anderson" notificationCount={5} />
      
      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your dealership today.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Sales"
            subtitle="This Month"
            value={dealershipMetrics.totalSales}
            suffix="units"
            trend={{
              value: dealershipMetrics.salesGrowth,
              isPositive: dealershipMetrics.salesGrowth > 0
            }}
            progress={{
              value: 73,
              max: 100,
              color: 'success'
            }}
            icon={Car}
            iconColor="bg-primary"
          />
          
          <MetricCard
            title="Monthly Revenue"
            value={formatCurrency(dealershipMetrics.monthlyRevenue)}
            trend={{
              value: dealershipMetrics.revenueGrowth,
              isPositive: dealershipMetrics.revenueGrowth > 0
            }}
            icon={DollarSign}
            iconColor="bg-success"
          />
          
          <MetricCard
            title="Available Inventory"
            value={dealershipMetrics.vehiclesInStock}
            suffix="cars"
            trend={{
              value: Math.abs(dealershipMetrics.inventoryChange),
              isPositive: dealershipMetrics.inventoryChange > 0
            }}
            progress={{
              value: 45,
              max: 100,
              color: 'primary'
            }}
            icon={Package}
            iconColor="bg-secondary"
          />
          
          <MetricCard
            title="Customer Satisfaction"
            value={dealershipMetrics.customerSatisfaction}
            suffix="/5 stars"
            trend={{
              value: dealershipMetrics.satisfactionGrowth,
              isPositive: dealershipMetrics.satisfactionGrowth > 0
            }}
            icon={Star}
            iconColor="bg-success"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Sales Chart - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          
          {/* Secondary Charts Column */}
          <div className="space-y-6">
            <InventoryChart />
            <CustomerSatisfactionGauge rating={dealershipMetrics.customerSatisfaction} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopSellingChart />
          
          {/* Recent Activity Card */}
          <div className="card-automotive p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Latest dealership updates</p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  icon: Car,
                  title: 'New vehicle added to inventory',
                  subtitle: '2024 Toyota Camry Hybrid',
                  time: '2 hours ago',
                  color: 'text-blue-600'
                },
                {
                  icon: DollarSign,
                  title: 'Sale completed',
                  subtitle: '2024 Honda Accord to John Smith',
                  time: '4 hours ago',
                  color: 'text-green-600'
                },
                {
                  icon: Users,
                  title: 'New customer inquiry',
                  subtitle: 'Sarah Johnson interested in BMW 3 Series',
                  time: '6 hours ago',
                  color: 'text-purple-600'
                },
                {
                  icon: TrendingUp,
                  title: 'Monthly target achieved',
                  subtitle: 'Sales target reached 5 days early',
                  time: '1 day ago',
                  color: 'text-green-600'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
