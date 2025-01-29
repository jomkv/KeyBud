import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConvoState } from "../../@types/messageType";

const initialState: IConvoState = {
  recipient: null,
  convoId: null,
  messages: [],
  createNew: false,
  isSet: false,
};

const conversationSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<IConvoState>) => {
      state.isSet = true;
      state.convoId = action.payload.convoId || null;
      state.recipient = action.payload.recipient;
      state.createNew = false;
      state.messages = action.payload.messages || [];
    },
    createNew: (state) => {
      state.isSet = false;
      state.convoId = null;
      state.recipient = null;
      state.createNew = true;
      state.messages = [];
    },
    resetState: (state) => {
      state.isSet = false;
      state.convoId = null;
      state.recipient = null;
      state.createNew = false;
      state.messages = [];
    },
  },
});

export const { setConversation, createNew, resetState } =
  conversationSlice.actions;

export default conversationSlice.reducer;
