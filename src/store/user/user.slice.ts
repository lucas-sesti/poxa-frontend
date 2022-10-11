import { createSlice } from "@reduxjs/toolkit";
import { User } from "models/user";

export interface UserState {
  user: {
    user: User;
    isAuthenticated: boolean;
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setUser(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: UserState) => {
  return state.user.user;
};

export default userSlice.reducer;
