import { PushProtocolContext } from '@/providers/PushProtocolProvider'
import { useContext } from 'react'

export const usePushProtocolUser = () => {
  return useContext(PushProtocolContext)
}
