"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"

export default function SalesAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<string>("month")
  const [isLoading, setIsLoading] = useState(true)

  // State for analytics data
  const [salesData, setSalesData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [shopData, setShopData] = useState<any[]>([])
  const [statusDistribution, setStatusDistribution] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])

  // Stats
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [averageOrderValue, setAverageOrderValue] = useState(0)

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true)

        // BACKEND INTEGRATION: Fetch analytics data based on timeRange
        // const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
        // const data = await response.json()

        // setSalesData(data.salesData)
        // setCategoryData(data.categoryData)
        // setShopData(data.shopData)
        // setStatusDistribution(data.statusDistribution)
        // setTopProducts(data.topProducts)
        // setTotalRevenue(data.totalRevenue)
        // setTotalOrders(data.totalOrders)
        // setAverageOrderValue(data.averageOrderValue)

        // For now, set empty arrays until backend is connected
        setSalesData([])
        setCategoryData([])
        setShopData([])
        setStatusDistribution([])
        setTopProducts([])
        setTotalRevenue(0)
        setTotalOrders(0)
        setAverageOrderValue(0)
      } catch (error) {
        console.error("Failed to fetch analytics data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeRange])

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Handle export
  const handleExport = () => {
    // BACKEND INTEGRATION: Export analytics data
    // const exportData = {
    //   salesData,
    //   categoryData,
    //   shopData,
    //   statusDistribution,
    //   topProducts,
    //   totalRevenue,
    //   totalOrders,
    //   averageOrderValue,
    //   timeRange,
    //   exportDate: new Date().toISOString()
    // }

    // // Convert to CSV or Excel format
    // const dataStr = JSON.stringify(exportData)
    // const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

    // // Create download link
    // const exportFileDefaultName = `sales-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`
    // const linkElement = document.createElement('a')
    // linkElement.setAttribute('href', dataUri)
    // linkElement.setAttribute('download', exportFileDefaultName)
    // linkElement.click()

    // For now, just log to console
    console.log("Export analytics data for", timeRange)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales Analytics</h1>
          <p className="text-muted-foreground">Analyze your sales performance and trends</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] bg-white dark:bg-gray-950">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Time Range</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading analytics data...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">For the selected period</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalOrders}</div>
                <p className="text-sm text-muted-foreground">For the selected period</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${averageOrderValue.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">For the selected period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends over the past months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {salesData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesData}
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
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-muted-foreground">No revenue data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Orders by Month</CardTitle>
                <CardDescription>Number of orders per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {salesData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salesData}
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
                        <Bar dataKey="orders" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-muted-foreground">No order data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-muted-foreground">No category data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Sales by Shop</CardTitle>
                <CardDescription>Distribution of sales across shops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {shopData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={shopData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {shopData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-muted-foreground">No shop data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>Current distribution of order statuses</CardDescription>
              </CardHeader>
              <CardContent>
                {statusDistribution.length > 0 ? (
                  <div className="space-y-4">
                    {/* BACKEND INTEGRATION: Render actual status distribution */}
                    {statusDistribution.map((status) => (
                      <div key={status.name}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                            {status.name}
                          </span>
                          <span className="text-sm text-muted-foreground">{status.percentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${status.percentage}%`,
                              backgroundColor: status.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-muted-foreground">No status data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with highest sales volume</CardDescription>
              </CardHeader>
              <CardContent>
                {topProducts.length > 0 ? (
                  <div className="space-y-4">
                    {/* BACKEND INTEGRATION: Render actual top products */}
                    {topProducts.map((product) => (
                      <div key={product.name}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium">{product.name}</span>
                          <span className="text-sm text-muted-foreground">{product.percentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${product.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-muted-foreground">No product data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

