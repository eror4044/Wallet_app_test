import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../interfaces/Transaction";
import {
  fetchDashboardData,
  fetchPaymentStatus,
  fetchTransactionById,
} from "../transactions/transactionsThunks";
import { DashboardData } from "../../interfaces/DashboardData";

interface TransactionsState {
  dashboardData: DashboardData;
  transaction: Transaction | null;
  paymentStatus: {
    status: string;
    month: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transaction: null,
  loading: false,
  error: null,
  dashboardData: { transactions: [] as Transaction[] } as DashboardData,
  paymentStatus: {
    status: "No Payment Due",
    month: "",
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransaction(state) {
      state.transaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.transaction = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const { clearTransaction } = transactionsSlice.actions;
