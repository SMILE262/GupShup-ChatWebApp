import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk, deleteMessageThunk } from "./messageThunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...(state.messages || []), action.payload];
    },
  },
  extraReducers: (builder) => {
    //sendMessage
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages = [...state.messages, action.payload?.responseData]  ;
      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //getMessage
    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.message;
      state.buttonLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // deleteMessage
    builder.addCase(deleteMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(deleteMessageThunk.fulfilled, (state, action) => {
      state.messages = state.messages?.filter(
        (message) => message?._id !== action.payload?.responseData?._id,
      );
      state.buttonLoading = false;
    });
    builder.addCase(deleteMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});


export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
