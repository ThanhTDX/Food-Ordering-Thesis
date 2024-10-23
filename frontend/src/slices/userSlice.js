import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const userLogin = createAsyncThunk(
  "api/users/login",
  async(phone_number, thunkAPI) => {
    try {
      
    } catch (error){
      return thunkAPI.rejectWithValue(error.message);
    };
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_info: {
      user_name: "",
    },
    token: "",
    error: null,
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
        state.user_info = action.payload;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(userLogin.rejected, (state, action) => {
        // action.payload = error
        state.loading = false;
        state.error = action.payload
      });
  },
});

export const { userLogout } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
