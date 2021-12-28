/**
 * @format
 * @flow
 */

import { createSlice } from '@reduxjs/toolkit'
import type { Chats } from 'store/types'
import type { BasicChat } from 'model/types/chat'
import type { BasicMessage } from 'model/types/message'

type PayloadAction<P = void, T = string> = {|
  payload: P,
  type: T,
|}

type MessagePayload = {|
  chatUid: string,
  messages: BasicMessage[],
|}

export const initialState: Chats = {
  active: [],
  messages: {},
}

const chatsSlice: any = createSlice<Chats>({
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
