//timestampChartSlice.ts 

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GlobalState } from '../store';
// 1. Define the shape of a single data point
export interface ChartDataPoint {
  date: string;  // e.g., "09:15 am"
  price: number; // e.g., 990.95
}

// 2. Define the State interface
export interface ChartState {
  data: ChartDataPoint[];
  symbol: string | null;
  lastUpdated: string | null;
  loading: boolean;
}

// 3. Set the initial state
const initialState: ChartState = {
  data: [],
  symbol: null,
  lastUpdated: null,
  loading: false,
};

// 4. Create the Slice
const timestampChartSlice = createSlice({
  name: 'timestampchart',
  initialState,
  reducers: {
    // Replaces the entire array (useful for initial fetch)
    setTimestampChartData: (state, action: PayloadAction<{ symbol: string; data: ChartDataPoint[] }>) => {
      state.data = action.payload.data;
      state.symbol = action.payload.symbol;
      state.lastUpdated = new Date().toLocaleTimeString();
      state.loading = false;
    },
    
    // Appends a single new point (useful for real-time updates)
    addPricePoint: (state, action: PayloadAction<ChartDataPoint>) => {
      state.data.push(action.payload);
      state.lastUpdated = new Date().toLocaleTimeString();
    },

    // Clear data for a new symbol
    clearTimestampChart: (state) => {
      state.data = [];
      state.symbol = null;
      state.lastUpdated = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

// 5. Export Actions
export const { 
  setTimestampChartData, 
  addPricePoint, 
  clearTimestampChart, 
  setLoading 
} = timestampChartSlice.actions;


// --- SELECTORS ---

/** * Selects the raw chart data array.
 * Useful for Chart.js or Recharts components.
 */
export const selectChartData = (state: GlobalState) => state.timestampChart.data;

/** * Selects the current stock symbol.
 */
export const selectChartSymbol = (state: GlobalState) => state.timestampChart.symbol;

/** * A derived selector to get only the prices (useful for calculating Min/Max).
 */
export const selectChartPrices = (state: GlobalState) => state.timestampChart.data.map(p => p.price);

/** * Selects the loading state.
 */
export const selectIsChartLoading = (state: GlobalState) => state.timestampChart.loading;





// 6. Export Reducer
export default timestampChartSlice.reducer;