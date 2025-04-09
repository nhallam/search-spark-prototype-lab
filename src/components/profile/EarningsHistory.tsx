
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartLine } from "lucide-react";

// Mock data for earnings history
export const generateMockData = (months: number) => {
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
          <span>Rent Saved</span>
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
        
        <div className="mb-6 flex flex-wrap gap-2">
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
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Your rent savings for the selected period:
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm">{timePeriod === 'ALL' ? 'All time' : timePeriod}</span>
            <span className="text-lg font-semibold text-brand">{formatCurrency(totalEarnings)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsHistory;
