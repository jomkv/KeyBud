import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConvoState } from "../../@types/messageType";

const initialState: IConvoState = {
  recipient: null,
  convoId: null,
  messages: [],
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
      state.messages = action.payload.messages || [];
    },
  },
});

export const { setConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
