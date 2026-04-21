export interface ChartMeta {
  currency: string;
  symbol: string;
  exchangeName: string;
  fullExchangeName: string;
  instrumentType: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  previousClose: number;
  longName: string;
  shortName: string;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface ChartQuote {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

export interface ChartIndicators {
  quote: ChartQuote[];
}

export interface ChartResult {
  meta: ChartMeta;
  timestamp: number[];
  indicators: ChartIndicators;
}

export interface YahooChartResponse {
  chart: {
    result: ChartResult[];
    error: any;
  };
}

// Flattened usable chart point (VERY IMPORTANT)
export interface CandlePoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
//✅ 2. Redux State Interface
export interface ChartState {
  loading: boolean;
  error: string | null;

  symbol: string | null;
  meta: ChartMeta | null;

  raw: YahooChartResponse | null;

  candles: CandlePoint[]; // processed usable data

  selectedRange: string; // 1d, 5d, 1mo etc
}