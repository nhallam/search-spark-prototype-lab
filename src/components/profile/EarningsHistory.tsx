
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartLine } from "lucide-react";

// Mock data for earnings history
const generateMockData = (months: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    // Generate somewhat realistic earnings that vary between $900-2500
    const earnings = Math.floor(Math.random() * 1600) + 900;
    
    data.push({
      month: monthName,
      earnings: earnings,
      date: date.toISOString(),
    });
  }
  
  return data;
};

// Generate different datasets for different time periods
const mockData = {
  '1M': generateMockData(1),
  '3M': generateMockData(3),
  '6M': generateMockData(6),
  '1Y': generateMockData(12),
  'ALL': generateMockData(24), // For "All time" we'll show 2 years of data
};

type TimePeriod = '1M' | '3M' | '6M' | '1Y' | 'ALL';

const EarningsHistory = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('3M');
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const totalEarnings = mockData[timePeriod].reduce((sum, item) => sum + item.earnings, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My Kiki History</span>
          <ChartLine size={20} />
        </CardTitle>
        <CardDescription>Track your earnings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Total Earnings</h3>
            <p className="text-xl font-semibold">{formatCurrency(totalEarnings)}</p>
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((period) => (
            <Button
              key={period}
              variant={timePeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod(period)}
            >
              {period === 'ALL' ? 'All' : period}
            </Button>
          ))}
        </div>
        
        <div className="h-[250px] w-full">
          <ChartContainer
            config={{
              earnings: {
                label: "Earnings",
                color: "#1FA598",
              },
            }}
          >
            <AreaChart
              data={mockData[timePeriod]}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1FA598" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1FA598" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                dy={5}  // Add some padding at the bottom
              />
              <YAxis
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                dx={-5}  // Move labels slightly inward
              />
              <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => `${label}`} />} />
              <Area
                type="monotone"
                dataKey="earnings"
                name="Earnings"
                stroke="#1FA598"
                fillOpacity={1}
                fill="url(#colorEarnings)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsHistory;
