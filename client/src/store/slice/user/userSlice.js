import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./userThunk";

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  otherUsers: null,
  buttonLoading: false,
  screenLoading: true,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Login User
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //Register User
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //Logout
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.isAuthenticated = false;
      localStorage.clear();
      ((state.selectedUser = null),
        (state.otherUsers = null),
        (state.buttonLoading = false));
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //getProfile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {});
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.isAuthenticated = true;
      state.screenLoading = false;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screeLoading = false;
    });

    //getOtherUsers
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {});
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screeLoading = false;
    });
  },
});
export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
