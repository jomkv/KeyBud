import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { conversationId: string | null } = {
  conversationId: null,
};

const conversationSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversationId: (state, action: PayloadAction<string>) => {
      state.conversationId = action.payload;
    },
  },
});

export const { setConversationId } = conversationSlice.actions;

export default conversationSlice.reducer;
