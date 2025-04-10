
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MarketAnalysis = () => {
  return (
    <div id="market" className="overflow-hidden rounded-xl shadow-lg border border-primary/20">
      <div className="bg-gradient-to-r from-primary to-brand px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart2 size={20} className="text-primary-foreground/80" />
            NYC Market Analysis
          </h3>
        </div>
        <p className="text-primary-foreground/80 text-sm mt-1">View seasonal trends to optimize your listing</p>
      </div>
      
      <div className="p-6 bg-white">
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-4">
          <h3 className="font-medium text-lg mb-2 text-foreground">Make data-driven decisions</h3>
          <p className="text-muted-foreground mb-4">
            Understand how NYC&apos;s rental market fluctuates throughout the year. Optimize your pricing,
            availability, and marketing based on seasonal demand patterns.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</div>
              <span className="text-sm text-foreground">Analyze supply and demand across all seasons</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</div>
              <span className="text-sm text-foreground">Track average pricing by month and season</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</div>
              <span className="text-sm text-foreground">Get strategic insights to maximize your revenue</span>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-blue-100 p-2 rounded text-center">
            <p className="text-xs text-blue-600 font-medium">Winter</p>
            <p className="text-lg font-bold text-blue-800">$195</p>
            <p className="text-xs text-blue-500">Avg. price</p>
          </div>
          <div className="bg-green-100 p-2 rounded text-center">
            <p className="text-xs text-green-600 font-medium">Spring</p>
            <p className="text-lg font-bold text-green-800">$230</p>
            <p className="text-xs text-green-500">Avg. price</p>
          </div>
          <div className="bg-amber-100 p-2 rounded text-center">
            <p className="text-xs text-amber-600 font-medium">Summer</p>
            <p className="text-lg font-bold text-amber-800">$300</p>
            <p className="text-xs text-amber-500">Avg. price</p>
          </div>
          <div className="bg-primary/10 p-2 rounded text-center">
            <p className="text-xs text-primary font-medium">Fall</p>
            <p className="text-lg font-bold text-primary-foreground">$240</p>
            <p className="text-xs text-primary/70">Avg. price</p>
          </div>
        </div>
        
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
          <Link to="/market-analysis">View Full Market Analysis</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketAnalysis;
