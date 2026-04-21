import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from '../store';
import {
  ChartState,
  YahooChartResponse,
  ChartResult,
  CandlePoint,
  ChartMeta,
} from "./chart.types";

export interface   Quote {
    companyName: string;
    symbol: string;
    sector: string;
    latestPrice: number;
    open: number;
    high: number;
    low: number;
    close: number;
    week52High: number;
    week52Low: number;
}
//✅ 2. Redux State Interface
export interface QuoteState {
  loading: boolean;
  error: string | null;

  symbol: string | null;
  meta: Quote | null;
  price: number;
}
//________________________________________
//✅ 3. Initial State
const initialState: QuoteState = {
  loading: false,
  error: null,

  symbol: null,
  meta: null,
  price :0
};
 
//________________________________________
//✅ 5. createSlice (Main Part)


const renderSlice = createSlice({
  name: "renderStockSlice",
  initialState,
  reducers: {
    // 🔄 Start Loading
    fetchRenderStart(state) {
      state.loading = true;
      state.error = null;
    },

    // ✅ Success
    fetchRenderSuccess(state, action: PayloadAction<{ symbol: string; meta: any}>) {
      state.loading = false;
     // state.raw = action.payload;
       state.symbol = action.payload.symbol;
         state.meta = action.payload.meta;
      const result = action.payload.meta;

      if (result) {
        state.price = result.latestPrice;
        state.symbol = result.symbol;
       
      }
    },

    // ❌ Error
    fetchRenderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔄 Reset Chart
    resetRender(state) {
      state.loading = false;
      state.error = null;
      state.symbol = null;
      state.meta = null;
 
    },

  
  },
});
//________________________________________
//✅ 6. Export Actions
export const {
  fetchRenderStart,
  fetchRenderSuccess,
  fetchRenderFailure,
  resetRender,
 
} = renderSlice.actions;

// --- SELECTORS ---

/** * Selects the raw chart data array.
 * Useful for Chart.js or Recharts components.
 */
export const selectRenderData = (state: GlobalState) => state.renderQuote?.meta;

/** * Selects the current stock symbol.
 */
export const selectRenderSymbol = (state: GlobalState) => state.renderQuote?.symbol;

/** * A derived selector to get only the prices (useful for calculating Min/Max).
 */
export const selectRenderPrice = (state: GlobalState) => state.renderQuote?.price; //data.map(p => p.price);

/** * Selects the loading state.
 */
export const selectIsRenderLoading = (state: GlobalState) => state.renderQuote?.loading;


//________________________________________
//✅ 7. Export Reducer
export default renderSlice.reducer;
