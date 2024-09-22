import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConvo } from "../../@types/messageType";

interface IState extends IConvo {
  isSet: boolean;
}

const initialState: IState = {
  _id: "",
  participants: [],
  messages: [],
  isSet: false,
};

const conversationSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<IConvo>) => {
      state.isSet = true;
      state._id = action.payload._id;
      state.participants = action.payload.participants;
      state.messages = action.payload.messages;
    },
  },
});

export const { setConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
