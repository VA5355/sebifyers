//🧩 1. Redux Slice (paymentSlice.ts)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAZORORDERANDPAYMENTURL } from '@/libs/client';
import { GlobalState } from '../store';
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (payload: any, { rejectWithValue }) => {
    try {
      const baseUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:8888"
          : RAZORORDERANDPAYMENTURL;
            // https://onedinaar.com
      const res = await axios.get(
        `${baseUrl}/.netlify/functions/netlifyproxyrazorpayment`,
        {
          params: payload,
          withCredentials: true,
        }
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Order failed");
    }
  }
);

export interface RazorPaymentSliceProps {
    order:any,
    loading:any,
    error : any,
   success :  any,
  
   
}
const initialState: RazorPaymentSliceProps = {
    order: null,
    loading: null,
     error: null,
      success: null,
    
}


const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    paymentSuccess: (state, action) => {
      state.success = action.payload;
    },
    paymentFailure: (state, action) => {
      state.error = action.payload;
    },
    resetPayment: (state) => {
      state.order = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { paymentSuccess, paymentFailure, resetPayment } =
  paymentSlice.actions;

// --- SELECTORS ---

/** * Selects the raw payment data .
 * Useful for creating virtual user sccount components.
 */
export const selectPaymentData = (state: GlobalState) => state.razorpayment;


export default paymentSlice.reducer;
