import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin as apiLogin} from "../api/userApi";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];

export const userLogin = createAsyncThunk(
  "api/users/login",
  async ({ phoneNumber, password }, thunkAPI) => {
    try {
      const data = apiLogin(phoneNumber, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userFromStorage,
    token: "",
    error: "",
    loading: true,
  },
  reducers: {
    userLogout: (state, action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        // action.payload =
        state.loading = false;
        state.user = action.payload;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(userLogin.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
