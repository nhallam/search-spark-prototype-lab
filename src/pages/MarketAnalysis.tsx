import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Bar, BarChart } from 'recharts';

// Define season type
type Season = 'Winter' | 'Spring' | 'Summer' | 'Fall';

// Define data structure for seasonal data
interface SeasonalData {
  month: string;
  season: Season;
  supply: number;
  demand: number;
  averagePrice: number;
  bookingRate: number;
}

// Mock data for NYC market by month
const nycMarketData: SeasonalData[] = [
  { month: 'Jan', season: 'Winter', supply: 620, demand: 450, averagePrice: 190, bookingRate: 72 },
  { month: 'Feb', season: 'Winter', supply: 610, demand: 480, averagePrice: 195, bookingRate: 78 },
  { month: 'Mar', season: 'Spring', supply: 650, demand: 550, averagePrice: 210, bookingRate: 84 },
  { month: 'Apr', season: 'Spring', supply: 680, demand: 620, averagePrice: 230, bookingRate: 91 },
  { month: 'May', season: 'Spring', supply: 700, demand: 680, averagePrice: 250, bookingRate: 97 },
  { month: 'Jun', season: 'Summer', supply: 740, demand: 800, averagePrice: 290, bookingRate: 100 },
  { month: 'Jul', season: 'Summer', supply: 760, demand: 850, averagePrice: 310, bookingRate: 100 },
  { month: 'Aug', season: 'Summer', supply: 750, demand: 820, averagePrice: 300, bookingRate: 100 },
  { month: 'Sep', season: 'Fall', supply: 720, demand: 700, averagePrice: 260, bookingRate: 97 },
  { month: 'Oct', season: 'Fall', supply: 700, demand: 650, averagePrice: 240, bookingRate: 93 },
  { month: 'Nov', season: 'Fall', supply: 670, demand: 580, averagePrice: 220, bookingRate: 86 },
  { month: 'Dec', season: 'Winter', supply: 650, demand: 520, averagePrice: 230, bookingRate: 80 },
];

// Calculate season aggregates
const calculateSeasonData = () => {
  const seasonData: Record<Season, { supply: number, demand: number, averagePrice: number, bookingRate: number }> = {
    Winter: { supply: 0, demand: 0, averagePrice: 0, bookingRate: 0 },
    Spring: { supply: 0, demand: 0, averagePrice: 0, bookingRate: 0 },
    Summer: { supply: 0, demand: 0, averagePrice: 0, bookingRate: 0 },
    Fall: { supply: 0, demand: 0, averagePrice: 0, bookingRate: 0 },
  };
  
  const seasonCounts: Record<Season, number> = { Winter: 0, Spring: 0, Summer: 0, Fall: 0 };
  
  nycMarketData.forEach(month => {
    seasonData[month.season].supply += month.supply;
    seasonData[month.season].demand += month.demand;
    seasonData[month.season].averagePrice += month.averagePrice;
    seasonData[month.season].bookingRate += month.bookingRate;
    seasonCounts[month.season]++;
  });
  
  // Calculate averages
  Object.keys(seasonData).forEach(season => {
    const key = season as Season;
    const count = seasonCounts[key];
    seasonData[key].supply = Math.round(seasonData[key].supply / count);
    seasonData[key].demand = Math.round(seasonData[key].demand / count);
    seasonData[key].averagePrice = Math.round(seasonData[key].averagePrice / count);
    seasonData[key].bookingRate = Math.round(seasonData[key].bookingRate / count);
  });
  
  return Object.entries(seasonData).map(([season, data]) => ({
    season,
    ...data,
    profit: Math.round(data.averagePrice * data.bookingRate / 100 * 30) // Estimated monthly profit
  }));
};

const seasonalAggregateData = calculateSeasonData();

// Define color mapping for seasons
const seasonColors = {
  Winter: "#60A5FA", // blue
  Spring: "#34D399", // green
  Summer: "#F97316", // orange
  Fall: "#8B5CF6"    // purple
};

const getSeasonColor = (season: Season) => seasonColors[season];

const MarketAnalysis: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-brand">NYC Market Analysis</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl mb-1">Seasonal Market Overview</CardTitle>
                  <CardDescription>12-month analysis of NYC's vacation rental market</CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>Data is based on historical trends and may vary. Booking rate reflects the percentage of available listings booked in a given period.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border bg-background p-1 mb-6">
                <div className="flex">
                  {seasonalAggregateData.map(season => (
                    <div 
                      key={season.season}
                      className="flex-1 p-3 text-center"
                      style={{ borderBottom: `3px solid ${getSeasonColor(season.season as Season)}` }}
                    >
                      <h3 className="text-lg font-semibold">{season.season}</h3>
                      <p className="text-2xl font-bold">${season.averagePrice}</p>
                      <p className="text-sm text-muted-foreground">Avg. price/night</p>
                      <div className="flex justify-center gap-2 mt-1">
                        <Badge 
                          variant={season.demand > season.supply ? "default" : "outline"}
                          className="text-xs"
                        >
                          {season.bookingRate}% Booked
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Tabs defaultValue="monthly">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
                  <TabsTrigger value="seasonal">Seasonal Comparison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="monthly" className="space-y-8">
                  <div className="h-80">
                    <ChartContainer 
                      config={{
                        supply: { label: "Available Listings", color: "#94A3B8" },
                        demand: { label: "Booking Requests", color: "#1FA598" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={nycMarketData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="month" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <ChartTooltip
                            content={({ active, payload }) => (
                              <ChartTooltipContent 
                                active={active} 
                                payload={payload} 
                                labelClassName="font-medium text-sm"
                              />
                            )}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="supply" 
                            stroke="#94A3B8" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                            name="Available Listings"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="demand" 
                            stroke="#1FA598" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }}
                            name="Booking Requests" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="h-80">
                    <h3 className="text-lg font-semibold mb-2">Average Price per Night ($)</h3>
                    <ChartContainer
                      config={{
                        averagePrice: { color: "#1FA598" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={nycMarketData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="month" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <ChartTooltip
                            content={({ active, payload }) => (
                              <ChartTooltipContent 
                                active={active} 
                                payload={payload}
                                formatter={(value) => [`$${value}`, 'Average Price']}
                              />
                            )}
                          />
                          <Bar 
                            dataKey="averagePrice" 
                            fill="#1FA598" 
                            name="Average Price"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="seasonal" className="space-y-8">
                  <div className="h-80">
                    <h3 className="text-lg font-semibold mb-2">Supply vs. Demand by Season</h3>
                    <ChartContainer
                      config={{
                        supply: { color: "#94A3B8" },
                        demand: { color: "#1FA598" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={seasonalAggregateData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                          barGap={0}
                          barCategoryGap="20%"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="season" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <ChartTooltip
                            content={({ active, payload }) => (
                              <ChartTooltipContent active={active} payload={payload} />
                            )}
                          />
                          <Legend />
                          <Bar dataKey="supply" fill="#94A3B8" name="Available Listings" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="demand" fill="#1FA598" name="Booking Requests" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="h-80">
                    <h3 className="text-lg font-semibold mb-2">Pricing & Occupancy by Season</h3>
                    <ChartContainer
                      config={{
                        averagePrice: { color: "#1FA598" },
                        bookingRate: { color: "#F97316" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={seasonalAggregateData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="season" stroke="#94A3B8" />
                          <YAxis yAxisId="left" orientation="left" stroke="#1FA598" />
                          <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                          <ChartTooltip
                            content={({ active, payload }) => (
                              <ChartTooltipContent 
                                active={active} 
                                payload={payload}
                                formatter={(value, name) => {
                                  if (name === 'averagePrice') return [`$${value}`, 'Average Price'];
                                  if (name === 'bookingRate') return [`${value}%`, 'Booking Rate'];
                                  return [value, name];
                                }}
                              />
                            )}
                          />
                          <Legend />
                          <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="averagePrice" 
                            stroke="#1FA598" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                            name="Average Price ($)"
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="bookingRate" 
                            stroke="#F97316" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }}
                            name="Booking Rate (%)" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-24">
                <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Winter (Dec-Feb)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm">
                      <p>Demand drops during colder months, but so does supply. Consider offering winter discounts or seasonal promotions to attract more bookings.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Spring (Mar-May)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm">
                      <p>Tourism begins to pick up, making this an ideal time to gradually increase prices as demand grows. Focus on advertising outdoor amenities.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-orange-50 border-orange-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Summer (Jun-Aug)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm">
                      <p>Peak demand season with highest booking rates. Consider premium pricing and minimum stay requirements to maximize revenue.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Fall (Sep-Nov)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm">
                      <p>High booking rate with slightly lower prices than summer. Highlight fall activities in NYC to attract more guests during this transitional season.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MarketAnalysis;
