import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChartState,
  YahooChartResponse,
  ChartResult,
  CandlePoint,
  ChartMeta,
} from "./chart.types";


//________________________________________
//✅ 3. Initial State
const initialState: ChartState = {
  loading: false,
  error: null,

  symbol: null,
  meta: null,

  raw: null,

  candles: [],

  selectedRange: "1d",
};
//________________________________________
//✅ 4. Helper → Transform Yahoo Data → Candles
//👉 THIS is the most important part for charts
const transformToCandles = (result: ChartResult): CandlePoint[] => {
  const timestamps = result.timestamp;
  const quote = result.indicators.quote[0];

  if (!timestamps || !quote) return [];

  return timestamps.map((time, i) => ({
    time,
    open: quote.open[i],
    high: quote.high[i],
    low: quote.low[i],
    close: quote.close[i],
    volume: quote.volume[i],
  }));
};
//________________________________________
//✅ 5. createSlice (Main Part)


const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    // 🔄 Start Loading
    fetchChartStart(state) {
      state.loading = true;
      state.error = null;
    },

    // ✅ Success
    fetchChartSuccess(state, action: PayloadAction<YahooChartResponse>) {
      state.loading = false;
      state.raw = action.payload;

      const result = action.payload.chart?.result?.[0];

      if (result) {
        state.meta = result.meta;
        state.symbol = result.meta.symbol;
        state.candles = transformToCandles(result);
      }
    },

    // ❌ Error
    fetchChartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔄 Reset Chart
    resetChart(state) {
      state.loading = false;
      state.error = null;
      state.symbol = null;
      state.meta = null;
      state.raw = null;
      state.candles = [];
    },

    // 🎯 Change Range (1d / 5d / 1mo etc)
    setChartRange(state, action: PayloadAction<string>) {
      state.selectedRange = action.payload;
    },

    // 🔄 Append live candle (for WebSocket use later 🔥)
    appendLiveCandle(state, action: PayloadAction<CandlePoint>) {
      state.candles.push(action.payload);

      // keep only last N candles (optional optimization)
      if (state.candles.length > 500) {
        state.candles.shift();
      }
    },

    // 🧠 Update last candle (real-time tick update)
    updateLastCandle(state, action: PayloadAction<CandlePoint>) {
      if (state.candles.length === 0) return;

      state.candles[state.candles.length - 1] = action.payload;
    },
  },
});
//________________________________________
//✅ 6. Export Actions
export const {
  fetchChartStart,
  fetchChartSuccess,
  fetchChartFailure,
  resetChart,
  setChartRange,
  appendLiveCandle,
  updateLastCandle,
} = chartSlice.actions;
//________________________________________
//✅ 7. Export Reducer
export default chartSlice.reducer;
