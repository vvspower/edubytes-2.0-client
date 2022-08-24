import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../ApiManager/auth";

export interface UserState {
  value: User;
}

let init: User = {
  _id: "",
  username: "",
  email: "",
  created: "",
  admin: false,
  partnerd: false,
  details: {
    bio: "",
    pfp: "",
    verified: false,
  },
  education: {
    institute: "",
    university: false,
    college: false,
    subjects: [],
  },
  friends: [],
};

const initialState: UserState = {
  value: init,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { initializeUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
