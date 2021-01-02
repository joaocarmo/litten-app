/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatSelector } from 'store/selectors'
import { setChats } from 'store/actions/chats'
import type { BasicChat } from 'model/types/chat'

const useActiveChats = (): [BasicChat[], (BasicChat[]) => void] => {
  const dispatch = useDispatch()

  const { active } = useSelector(chatSelector)

  const setNewChats = useCallback((newChats) => dispatch(setChats(newChats)), [
    dispatch,
  ])

  return [active, setNewChats]
}

export default useActiveChats
