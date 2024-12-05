import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReservationTableWithTime = createAsyncThunk(
  "api/reservationTable",
  async (id) => {
    try {
      const { data } = await axios.get();
      return data;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  }
);

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    name: "",
    datetime: new Date().toJSON(),
    tables: [],
    vip_room: [],
    num_of_people: -1,
  },
  reducers: {
    // addFormToDatabase: (state, action) => {

    // },
    // updateForm: ( state, action) => {

    // }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReservationTableWithTime.pending, (state, action) => {})
      .addCase(fetchReservationTableWithTime.fulfilled, (state, action) => {})
      .addCase(fetchReservationTableWithTime.rejected, (state, action) => {});
  }
})

export const reservationSelector = (state) => state.reservation;
export default reservationSlice.reducer;