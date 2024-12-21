import type { 
  DealershipMetrics, 
  VehicleData, 
  SalesChart, 
  CustomerData, 
  InventoryStatus, 
  TopSellingModel 
} from '@/types/dealership';

export const dealershipMetrics: DealershipMetrics = {
  totalSales: 147,
  vehiclesInStock: 234,
  monthlyRevenue: 2847000,
  customerSatisfaction: 4.8,
  salesGrowth: 12.5,
  revenueGrowth: 8.2,
  inventoryChange: -3.1,
  satisfactionGrowth: 2.3,
};

export const salesChartData: SalesChart[] = [
  { month: 'Jan', sales: 132, revenue: 2650000, target: 2500000 },
  { month: 'Feb', sales: 125, revenue: 2430000, target: 2500000 },
  { month: 'Mar', sales: 156, revenue: 3120000, target: 2800000 },
  { month: 'Apr', sales: 143, revenue: 2890000, target: 2800000 },
  { month: 'May', sales: 162, revenue: 3240000, target: 3000000 },
  { month: 'Jun', sales: 147, revenue: 2847000, target: 3000000 },
];

export const inventoryStatus: InventoryStatus[] = [
  { status: 'Available', count: 156, color: '#10b981' },
  { status: 'Sold', count: 89, color: '#3b82f6' },
  { status: 'Reserved', count: 23, color: '#f59e0b' },
];

export const topSellingModels: TopSellingModel[] = [
  { model: 'Camry', brand: 'Toyota', unitsSold: 28, revenue: 672000 },
  { model: 'Accord', brand: 'Honda', unitsSold: 24, revenue: 588000 },
  { model: 'F-150', brand: 'Ford', unitsSold: 22, revenue: 748000 },
  { model: '3 Series', brand: 'BMW', unitsSold: 18, revenue: 792000 },
  { model: 'C-Class', brand: 'Mercedes', unitsSold: 15, revenue: 675000 },
];

export const vehicleInventory: VehicleData[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 24995,
    status: 'available',
    fuelType: 'hybrid',
    color: 'Silver',
    mileage: 0,
    transmission: 'automatic',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    year: 2024,
    price: 26500,
    status: 'available',
    fuelType: 'gasoline',
    color: 'Black',
    mileage: 0,
    transmission: 'automatic',
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    price: 34995,
    status: 'sold',
    fuelType: 'gasoline',
    color: 'Blue',
    mileage: 0,
    transmission: 'automatic',
  },
  {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    price: 44995,
    status: 'available',
    fuelType: 'gasoline',
    color: 'White',
    mileage: 0,
    transmission: 'automatic',
  },
  {
    id: '5',
    make: 'Mercedes',
    model: 'C-Class',
    year: 2024,
    price: 45995,
    status: 'reserved',
    fuelType: 'gasoline',
    color: 'Gray',
    mileage: 0,
    transmission: 'automatic',
  },
];

export const customerData: CustomerData[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    purchaseDate: '2024-01-15',
    vehicle: '2024 Toyota Camry',
    satisfaction: 5,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    purchaseDate: '2024-01-22',
    vehicle: '2024 Honda Accord',
    satisfaction: 4,
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mike.brown@email.com',
    phone: '(555) 345-6789',
    purchaseDate: '',
    vehicle: '',
    satisfaction: 0,
    status: 'potential',
  },
];

export const satisfactionData = [
  { name: '5 Stars', value: 68, color: '#10b981' },
  { name: '4 Stars', value: 22, color: '#3b82f6' },
  { name: '3 Stars', value: 7, color: '#f59e0b' },
  { name: '2 Stars', value: 2, color: '#ef4444' },
  { name: '1 Star', value: 1, color: '#dc2626' },
];