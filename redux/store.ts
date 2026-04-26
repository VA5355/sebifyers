import { configureStore } from '@reduxjs/toolkit';
import stockSlice, { StockSliceProps } from './slices/stockSlice';
import miscSlice, {MiscSliceProps} from './slices/miscSlice';
import equitySlice, { EquitySliceProps } from './slices/equitySlice';
import tradeSlice, { TradeSliceProps } from './slices/tradeSlice';
import holdingSlice, { HoldingSliceProps } from './slices/holdingSlice';
import positionSlice, { PositionSliceProps } from './slices/positionSlice';
import orderBookSlice, { OrderBookSliceProps } from './slices/orderBookSlice';
import buyOrderBookSlice, { BuyOrderBookSliceProps } from './slices/buyOrderBookSlice';
import tickerSensexSlice, { TickerSensexSliceProps } from './slices/tickerSensexSlice';
import tickerBankNiftySlice, { TickerBankNiftySliceProps } from './slices/tickerBankNiftySlice';
import tickerNiftySlice, { TickerNiftySliceProps } from './slices/tickerNiftySlice';
import tickerSlice,{  TickerSliceProps } from './slices/tickerSlice';
import webSocketSlice,{  WebSocketSliceProps } from './slices/webSocketSlice';
import marketSlice,{  MarketSliceProps } from './slices/marketSlice';
import timestampChartSlice,{  ChartState } from './slices/timestampChartSlice';
import renderSlice,{  QuoteState } from './slices/renderDotcomStockSlice';
import paymentSlice,{  RazorPaymentSliceProps } from './slices/paymentSlice';
import {    ModalSliceProps } from '../components/common/service/ModalService';
import   modelSlice      from '../components/common/service/ModalService';

import modalReducer, { createModalMiddleware } from '../components/common/service/ModalService';
import modalGenReducer from './slices/modalGenSlice';
import loadingReducer from './slices/loadingSlice';
import marketReducer from './slices/marketSlice';
import indicesSlice,{  IndicesSliceProps } from '@/redux/slices/indicesSlice';
import indicesReducer  from '@/redux/slices/indicesSlice';
import timestampChartReducer  from '@/redux/slices/timestampChartSlice';
import renderReducer  from '@/redux/slices/renderDotcomStockSlice';
import paymentReducer  from './slices/paymentSlice';

export interface GlobalState {
    stock: StockSliceProps;
    misc: MiscSliceProps;
    equity: EquitySliceProps
    trade: TradeSliceProps,
    order: OrderBookSliceProps,
    buyOrder: BuyOrderBookSliceProps,
     position: PositionSliceProps,
     holding:HoldingSliceProps ,
     nifty:TickerNiftySliceProps ,
     sensex:TickerSensexSliceProps ,
     banknifty:TickerBankNiftySliceProps ,
     ticker: TickerSliceProps,
     websocket:WebSocketSliceProps,
     market:MarketSliceProps,
     indices: IndicesSliceProps,
     timestampChart: ChartState,
     renderQuote:QuoteState,
     razorpayment: RazorPaymentSliceProps,
     modalpayload: ModalSliceProps
}
const modalMiddleware = createModalMiddleware({
        mapRejectedToModal: (action:any) => ({
        title: 'Operation failed',
        message: action.payload?.message || action.error?.message || 'Request failed',
        }),
});
export const store = configureStore({
	reducer: {
        stock: stockSlice,
        misc:miscSlice,
        equity: equitySlice,
        trade:tradeSlice,
        order:orderBookSlice,
        buyOrder:buyOrderBookSlice,
        position:positionSlice,
        holding:holdingSlice,
        nifty:tickerNiftySlice,
        sensex:tickerSensexSlice ,
        banknifty:tickerBankNiftySlice,
        ticker:tickerSlice,
        websocket: webSocketSlice, // <-- THIS makes state.websocket available
        modalpayload: modelSlice, // <-- THIS makes razororderslice  available
         modal: modalReducer ,
         modalpop : modalGenReducer,
         loader: loadingReducer,
         market: marketReducer,
         indexes:indicesSlice,
         indices:indicesReducer,
         timestampChart:timestampChartReducer,
         render:renderReducer,
         razorpay:paymentReducer

	},
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(modalMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
