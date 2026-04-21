import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HeaderSearchChartFailProps {
 
   code? :  any,
   message? : any,
   s? :any,
       companyName: string;
    symbol: string;
     type?:any;
      sector?: string;
    latestPrice: number;
    open: number;
    high: number;
    low: number;
    close: number;
    week52High: number;
    week52Low: number;
}

export interface HeaderSearchChartSliceProps extends HeaderSearchChartFailProps {

     companyName: string;
      latestPrice: number;
    open: number;
    high: number;
    low: number;
    close: number;
    week52High: number;
    week52Low: number;
        symbol:any;
    type?:any,
   ltp? : any,
   code? :  any,
   message? : any,
    sector?: string;
  
   
}
const initialState: HeaderSearchChartSliceProps = {
    symbol: null,
    type: null,
     companyName: '',
      latestPrice: 0,
    open: 0,
    high:0,
    low:0,
    close:0,
    week52High:0,
    week52Low:0,
     ltp : 0,
   code :  0,
   message : '',
    sector: ''
}



const headerSearchChartSlice = createSlice({
    name: "headerSearchChart",
    initialState,
    reducers: {
        saveSymbol: (state, action) => {
            state.symbol=action.payload
        },
        saveType: (state, action) => {
            state.type=action.payload
        },
          saveLtp: (state, action) => {
            state.ltp=action.payload
        },
          saveLatestPrice: (state, action) => {
            state.latestPrice=action.payload
        },
          saveOpen: (state, action) => {
            state.open=action.payload
        },
          saveHigh: (state, action) => {
            state.high=action.payload
        },
          saveLow: (state, action) => {
            state.low=action.payload
        },
          saveClose: (state, action) => {
            state.close=action.payload
        },
          saveWeek52High: (state, action) => {
            state.week52High=action.payload
        },
          saveWeek52Low: (state, action) => {
            state.week52Low=action.payload
        },
         
    },
})

export const { saveSymbol, saveType , saveLtp ,saveLatestPrice,saveOpen,saveHigh, saveLow, saveClose,  saveWeek52High ,saveWeek52Low    } = headerSearchChartSlice.actions;

export default headerSearchChartSlice.reducer;