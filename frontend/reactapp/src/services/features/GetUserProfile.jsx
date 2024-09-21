import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
};

const getUserProfile = createSlice({
  name: "getUserProfile",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
  },
});

// Export reducers:
export const { setFirstName, setLastName } = getUserProfile.actions;
export default getUserProfile.reducer;
