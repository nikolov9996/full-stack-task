import { createSlice } from "@reduxjs/toolkit";

export const AUTH_REDUCER_NAME = "auth";

const initialState = {
  email: "",
  instruments_access: null,
  id: "",
  created_at: "",
  updated_at: "",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmZWY3YzU0LWZkOWYtNDViNy05MTIwLTJiZTdjMjEwNTdmNCIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJpbnN0cnVtZW50c19hY2Nlc3MiOnRydWUsImNyZWF0ZWRfYXQiOiIyMDIyLTA4LTAyVDA5OjI1OjMyLjMzNFoiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wOC0wMlQwOToyNTozMi4zMzRaIiwiaWF0IjoxNjU5NDMyMzMyLCJleHAiOjE2NjIwMjQzMzJ9.ksXIpKB_oLjUgPP6PAEpn_dflQiuG8CilcIM9yohLSg",
};

export const authSlice = createSlice({
  name: AUTH_REDUCER_NAME,
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.created_at = payload.created_at;
      state.instruments_access = payload.instruments_access;
      state.id = payload.id;
      state.updated_at = payload.updated_at;
      state.token = payload.token;
      state.email = payload.email;

    },
    
  },
});

export const selectToken = (store) => store[AUTH_REDUCER_NAME].token;

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
