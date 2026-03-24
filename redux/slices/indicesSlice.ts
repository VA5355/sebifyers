import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IndicesFailProps {
 
   code? :  any,
   message? : any,
   s? :any,
}

export interface IndicesSliceProps extends IndicesFailProps {
    symbol:any,
    type:any,
   ltp? : any,
   code? :  any,
   message? : any,
     searchResults: any,
   indicesBook:  any[]  | undefined,
   
}
const initialState: IndicesSliceProps = {
    symbol: null,
    type: null,
     searchResults: null,
     indicesBook: undefined,
}



const indicesSlice = createSlice({
    name: "indices",
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
         saveStockResults: (state, action) => {
            state.searchResults=action.payload
        },
          saveIndicesBook: (state, action: PayloadAction<  any []   >) => {
                  state.indicesBook = action.payload;
         },
    },
})

export const { saveSymbol, saveType , saveLtp ,saveStockResults ,saveIndicesBook    } = indicesSlice.actions;

export default indicesSlice.reducer;