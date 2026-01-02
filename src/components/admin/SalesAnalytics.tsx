import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    ShoppingCart,
    Package,
    Target,
    Zap,
    AlertTriangle,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight,
    Brain,
    Clock
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";

const SalesAnalytics = () => {
    const [timeRange, setTimeRange] = useState("30d");

    // Sales Performance Data
    const salesTrend = [
        { date: "Week 1", revenue: 12400, orders: 98, avgOrder: 126.5, target: 15000 },
        { date: "Week 2", revenue: 15800, orders: 124, avgOrder: 127.4, target: 15000 },
        { date: "Week 3", revenue: 18200, orders: 142, avgOrder: 128.2, target: 15000 },
        { date: "Week 4", revenue: 21500, orders: 165, avgOrder: 130.3, target: 15000 },
        { date: "Week 5", revenue: 24800, orders: 189, avgOrder: 131.2, target: 15000 },
        { date: "Week 6", revenue: 28400, orders: 215, avgOrder: 132.1, target: 15000 }
    ];

    // Customer Segmentation
    const customerSegments = [
        { segment: "VIP (£5000+)", customers: 112, revenue: 89600, avgValue: 800, color: "#8b5cf6" },
        { segment: "High Value (£2000-5000)", customers: 456, revenue: 156800, avgValue: 344, color: "#3b82f6" },
        { segment: "Medium (£500-2000)", customers: 1245, revenue: 124500, avgValue: 100, color: "#10b981" },
        { segment: "Low (<£500)", customers: 3421, revenue: 68420, avgValue: 20, color: "#f59e0b" }
    ];

    // Product Performance
    const topPerformers = [
        {
            product: "Hi-Vis Safety Vest",
            revenue: 45600,
            units: 1520,
            growth: 24,
            margin: 42,
            trend: "up",
            stock: "healthy"
        },
        {
            product: "Work Polo Shirt",
            revenue: 38900,
            units: 1297,
            growth: 18,
            margin: 38,
            trend: "up",
            stock: "low"
        },
        {
            product: "Steel Toe Boots",
            revenue: 34200,
            units: 570,
            growth: 15,
            margin: 35,
            trend: "up",
            stock: "healthy"
        },
        {
            product: "Cargo Work Trousers",
            revenue: 28700,
            units: 820,
            growth: -5,
            margin: 32,
            trend: "down",
            stock: "overstocked"
        }
    ];

    // Conversion Funnel
    const conversionData = [
        { stage: "Visitors", count: 15234, rate: 100 },
        { stage: "Product Views", count: 8456, rate: 55.5 },
        { stage: "Add to Cart", count: 2456, rate: 16.1 },
        { stage: "Checkout", count: 1234, rate: 8.1 },
        { stage: "Purchase", count: 578, rate: 3.8 }
    ];

    // Revenue by Category
    const categoryRevenue = [
        { name: "Workwear", value: 125600, percentage: 35, growth: 12 },
        { name: "Hi-Vis", value: 89400, percentage: 25, growth: 24 },
        { name: "Safety Boots", value: 71520, percentage: 20, growth: 8 },
        { name: "Corporate", value: 42912, percentage: 12, growth: 15 },
        { name: "Accessories", value: 28608, percentage: 8, growth: -3 }
    ];

    // Time-based Performance
    const hourlyPerformance = [
        { hour: "9AM", sales: 45, conversion: 3.2 },
        { hour: "10AM", sales: 78, conversion: 4.1 },
        { hour: "11AM", sales: 92, conversion: 4.5 },
        { hour: "12PM", sales: 65, conversion: 3.8 },
        { hour: "1PM", sales: 58, conversion: 3.5 },
        { hour: "2PM", sales: 88, conversion: 4.3 },
        { hour: "3PM", sales: 95, conversion: 4.7 },
        { hour: "4PM", sales: 72, conversion: 4.0 }
    ];

    // AI Predictions & Recommendations
    const aiInsights = [
        {
            type: "opportunity",
            title: "Increase Hi-Vis Category Promotion",
            impact: "+£12,400 potential revenue",
            confidence: 92,
            action: "Hi-Vis products showing 24% growth. Increase ad spend by 30%.",
            icon: TrendingUp,
            color: "text-green-600"
        },
        {
            type: "warning",
            title: "Low Stock Alert - Work Polo Shirts",
            impact: "Risk of stockout in 5 days",
            confidence: 88,
            action: "Reorder 500 units immediately to avoid lost sales.",
            icon: AlertTriangle,
            color: "text-orange-600"
        },
        {
            type: "optimization",
            title: "Optimize Pricing for Cargo Trousers",
            impact: "+£3,200 potential revenue",
            confidence: 85,
            action: "Reduce price by 8% to clear overstock and boost sales.",
            icon: DollarSign,
            color: "text-blue-600"
        },
        {
            type: "opportunity",
            title: "Target VIP Customers with Bundle Deals",
            impact: "+£8,900 potential revenue",
            confidence: 90,
            action: "112 VIP customers haven't purchased in 30 days. Send personalized offers.",
            icon: Target,
            color: "text-purple-600"
        }
    ];

    // Customer Behavior Metrics
    const behaviorMetrics = [
        { metric: "Avg Session Duration", value: "4m 32s", change: "+12%", trend: "up" },
        { metric: "Pages per Session", value: "5.8", change: "+8%", trend: "up" },
        { metric: "Bounce Rate", value: "32.4%", change: "-5%", trend: "down" },
        { metric: "Cart Abandonment", value: "68.2%", change: "-3%", trend: "down" }
    ];

    // Revenue Forecast
    const forecast = [
        { month: "Jan", actual: 284950, forecast: 290000, lower: 275000, upper: 305000 },
        { month: "Feb", actual: null, forecast: 312000, lower: 295000, upper: 329000 },
        { month: "Mar", actual: null, forecast: 335000, lower: 315000, upper: 355000 },
        { month: "Apr", actual: null, forecast: 358000, lower: 335000, upper: 381000 }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <Brain className="w-8 h-8 text-primary" />
                        Sales Intelligence
                    </h2>
                    <p className="text-muted-foreground">AI-powered insights to maximize revenue</p>
                </div>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="12m">Last 12 Months</option>
                </select>
            </div>

            {/* AI Insights - Top Priority */}
            <div className="grid md:grid-cols-2 gap-4">
                {aiInsights.map((insight, idx) => {
                    const Icon = insight.icon;
                    return (
                        <Card key={idx} className="p-6 border-l-4 border-l-primary">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-6 h-6 ${insight.color}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold">{insight.title}</h3>
                                        <Badge variant="outline" className="text-xs">
                                            {insight.confidence}% confidence
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-semibold text-green-600 mb-2">{insight.impact}</p>
                                    <p className="text-sm text-muted-foreground mb-3">{insight.action}</p>
                                    <Button size="sm">Take Action</Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold">£284,950</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-semibold">+18.5%</span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold">3.8%</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-semibold">+0.4%</span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Avg Order Value</p>
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold">£127.50</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-semibold">+5.2%</span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Customer LTV</p>
                        <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold">£456.80</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-semibold">+12.3%</span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                </Card>
            </div>

            {/* Tabs for Different Analytics Views */}
            <Tabs defaultValue="performance" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="forecast">Forecast</TabsTrigger>
                </TabsList>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-4">
                        {/* Revenue Trend */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Revenue vs Target</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={salesTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                    <Area type="monotone" dataKey="target" stroke="#f59e0b" fill="none" strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>

                        {/* Conversion Funnel */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Conversion Funnel</h3>
                            <div className="space-y-3">
                                {conversionData.map((stage, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{stage.stage}</span>
                                            <span className="font-semibold">{stage.count.toLocaleString()} ({stage.rate}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                                                style={{ width: `${stage.rate}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Hourly Performance */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Peak Sales Hours</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={hourlyPerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales" />
                                <Bar yAxisId="right" dataKey="conversion" fill="#10b981" name="Conversion %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Behavior Metrics */}
                    <div className="grid md:grid-cols-4 gap-4">
                        {behaviorMetrics.map((metric, idx) => (
                            <Card key={idx} className="p-4">
                                <p className="text-xs text-muted-foreground mb-1">{metric.metric}</p>
                                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                                <div className="flex items-center gap-1">
                                    {metric.trend === "up" ? (
                                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4 text-green-600" />
                                    )}
                                    <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Customers Tab */}
                <TabsContent value="customers" className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-4">
                        {/* Customer Segmentation */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Customer Segments</h3>
                            <div className="space-y-4">
                                {customerSegments.map((seg, idx) => (
                                    <div key={idx} className="p-4 border rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-semibold">{seg.segment}</h4>
                                                <p className="text-sm text-muted-foreground">{seg.customers} customers</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">£{seg.revenue.toLocaleString()}</p>
                                                <p className="text-xs text-muted-foreground">Avg: £{seg.avgValue}</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${(seg.revenue / 439320) * 100}%`,
                                                    backgroundColor: seg.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Revenue by Category */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Revenue by Category</h3>
                            <div className="space-y-3">
                                {categoryRevenue.map((cat, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-semibold">{cat.name}</span>
                                                <span className="text-sm">£{cat.value.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full"
                                                        style={{ width: `${cat.percentage}%` }}
                                                    />
                                                </div>
                                                <span className={`text-xs font-semibold ${cat.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {cat.growth > 0 ? '+' : ''}{cat.growth}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value="products" className="space-y-4">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Top Performing Products</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3">Product</th>
                                        <th className="text-right py-3">Revenue</th>
                                        <th className="text-right py-3">Units</th>
                                        <th className="text-right py-3">Growth</th>
                                        <th className="text-right py-3">Margin</th>
                                        <th className="text-center py-3">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topPerformers.map((product, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="py-3 font-semibold">{product.product}</td>
                                            <td className="text-right py-3">£{product.revenue.toLocaleString()}</td>
                                            <td className="text-right py-3">{product.units.toLocaleString()}</td>
                                            <td className="text-right py-3">
                                                <span className={`flex items-center justify-end gap-1 ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {product.growth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                                    {product.growth > 0 ? '+' : ''}{product.growth}%
                                                </span>
                                            </td>
                                            <td className="text-right py-3">{product.margin}%</td>
                                            <td className="text-center py-3">
                                                <Badge variant={
                                                    product.stock === "healthy" ? "default" :
                                                        product.stock === "low" ? "destructive" : "outline"
                                                }>
                                                    {product.stock}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </TabsContent>

                {/* Forecast Tab */}
                <TabsContent value="forecast" className="space-y-4">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Revenue Forecast (Next 3 Months)</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={forecast}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="upper" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.2} name="Upper Bound" />
                                <Area type="monotone" dataKey="forecast" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} name="Forecast" />
                                <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Actual" />
                                <Area type="monotone" dataKey="lower" stroke="#d1d5db" fill="#ffffff" fillOpacity={0} name="Lower Bound" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Projected Revenue (Q1)</p>
                                <p className="text-2xl font-bold">£1,005,000</p>
                                <p className="text-sm text-green-600 mt-1">+18% vs last quarter</p>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Confidence Level</p>
                                <p className="text-2xl font-bold">87%</p>
                                <p className="text-sm text-muted-foreground mt-1">Based on historical data</p>
                            </div>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Growth Trajectory</p>
                                <p className="text-2xl font-bold">Strong</p>
                                <p className="text-sm text-green-600 mt-1">Accelerating growth</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SalesAnalytics;
