
/*
export interface VitualAccountSliceProps {
    loader: boolean,
    isActivated: boolean,
    creationDate: string,
    expiration: any,
     underlyingOrderId:any
    platformType: string    // Fyers , Upstoc in case in future empanelled 
}
const initialState:VitualAccountSliceProps = {
    loader: false,
    isActivated: false,
    creationDate: '',
    expiration: '',
    underlyingOrderId: '',
    platformType: "virtual"
}
*/import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const activateVirtualAccount = createAsyncThunk(
  "virtualAccount/activate",
  async (payload: any, { rejectWithValue }) => {
    try {
      const baseUrl = window.location.hostname === "localhost" 
        ? "http://localhost:8888" 
        : "https://onedinaar.com";
        
      const res = await axios.post(
        `${baseUrl}/.netlify/functions/netlifyproxyvirtualaccountmongo`,
        payload,
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
     // return rejectWithValue(err.response?.data || "Activation failed");
       if( err?.response?.data?.code === "SERVER_BUSY") {
          return rejectWithValue(err?.response?.data?.message ||
          "Server registrations are currently at peak. Please retry after some time.");
       }
       else 
         return rejectWithValue( "Server issues. Please retry after some time.");
    }
  }
);

interface VirtualAccountState {
  loader: boolean;
  isActivated: boolean;
  user: any;
  error: any;
}

const initialState: VirtualAccountState = {
  loader: false,
  isActivated: false,
  user: null,
  error: null,
};

const virtualAccountSlice = createSlice({
  name: "virtualAccount",
  initialState,
  reducers: {
    logoutVirtual: (state) => {
      state.isActivated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(activateVirtualAccount.pending, (state) => {
        state.loader = true;
      })
      .addCase(activateVirtualAccount.fulfilled, (state, action) => {
        state.loader = false;
        state.isActivated = true;
        state.user = action.payload;
      })
      .addCase(activateVirtualAccount.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  }
});

export const { logoutVirtual } = virtualAccountSlice.actions;
export default virtualAccountSlice.reducer;
