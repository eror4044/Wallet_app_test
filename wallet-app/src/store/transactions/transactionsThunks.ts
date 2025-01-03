import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Transaction } from "../../interfaces/Transaction";
import { DashboardData } from "../../interfaces/DashboardData";

export const fetchDashboardData = createAsyncThunk<DashboardData>(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to load dashboard");
    }
  }
);

export const fetchTransactionById = createAsyncThunk<Transaction, string>(
  "transaction/fetchTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to load transaction details");
    }
  }
);
export const fetchPaymentStatus = createAsyncThunk(
  "dashboard/fetchPaymentStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paymentStatus`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching payment status:", error);
      return rejectWithValue("Error fetching payment status");
    }
  }
);