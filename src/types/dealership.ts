// TypeScript interfaces for Automotive Dealership Management

export interface DealershipMetrics {
  totalSales: number;
  vehiclesInStock: number;
  monthlyRevenue: number;
  customerSatisfaction: number;
  salesGrowth: number;
  revenueGrowth: number;
  inventoryChange: number;
  satisfactionGrowth: number;
}

export interface VehicleData {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  fuelType: 'gasoline' | 'hybrid' | 'electric' | 'diesel';
  color: string;
  mileage: number;
  transmission: 'automatic' | 'manual';
}

export interface SalesChart {
  month: string;
  sales: number;
  revenue: number;
  target: number;
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  purchaseDate: string;
  vehicle: string;
  satisfaction: number;
  status: 'active' | 'potential' | 'past';
}

export interface InventoryStatus {
  status: string;
  count: number;
  color: string;
}

export interface TopSellingModel {
  model: string;
  brand: string;
  unitsSold: number;
  revenue: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}