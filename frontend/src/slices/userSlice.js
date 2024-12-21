import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin as apiLogin, fetchUserOrderingbyId } from "../api/userApi";

export const userIsLoggedIn = localStorage.getItem("user") ? true : false

export const fetchUserOrdering = createAsyncThunk(
  "api/users/ordering",
  async ({user}, thunkAPI) => {
    try {
      const data = fetchUserOrderingbyId(user);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserReservation = createAsyncThunk(
  "api/users/reservation",
  async (_, thunkAPI) => {
    try {
      const data = 1;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "api/users/login",
  async ({ phoneNumber, password }, thunkAPI) => {
    try {
      const data = await apiLogin(phoneNumber, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    token: "",
    status: {
      error: "",
      loading: false,
    },
  },
  reducers: {
    userLogout: (state, action) => {
      localStorage.removeItem("user");
      state.userInfo = {};
    },
    // userCancelOrder: (state,action) => {},
    // userCancelReservation: (state,action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        // action.payload =
        state.status.loading = false;
        state.status.error = null;
        state.userInfo.username = action.payload.username;
        state.userInfo.phoneNumber = action.payload.phone_number;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userLogin.rejected, (state, action) => {
        // action.payload = error
        state.status.loading = false;
        state.status.error = action.payload;
      })
      .addCase(fetchUserOrdering.pending, (state, action) => {
        state.status.loading = true;
      })
      .addCase(fetchUserOrdering.fulfilled, (state, action) => {
        // TODO: set user's order to value
        state.status.loading = false;
      })
      .addCase(fetchUserOrdering.rejected, (state, action) => {
        // action.payload = error
        state.status.loading = false;
        state.status.error = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
