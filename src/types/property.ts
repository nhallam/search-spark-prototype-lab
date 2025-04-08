
// Availability window type for property listings
export type AvailabilityWindow = {
  id: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
};

// Property combination for longer stays
export type PropertyCombination = {
  id: string;
  properties: {
    property: any; // Property object
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  }[];
  totalPrice: number;
  coveragePercentage: number;
};
