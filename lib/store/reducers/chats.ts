/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BasicChat } from '@model/types/chat'
import type { BasicMessage } from '@model/types/message'

type MessagePayload = {
  chatUid: string
  messages: BasicMessage[]
}
const initialState = {
  active: [],
  messages: {},
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<BasicChat[]>) {
      state.active = action.payload
    },

    setMessages(state, action: PayloadAction<MessagePayload>) {
      state.messages[action.payload.chatUid] = action.payload.messages
    },
  },
})

export const { setChats, setMessages } = chatsSlice.actions

export default chatsSlice.reducer
