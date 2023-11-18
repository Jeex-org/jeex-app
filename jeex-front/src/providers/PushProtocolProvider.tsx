import { usePrivy, useWallets } from '@privy-io/react-auth'
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { PushAPI, SignerType } from '@pushprotocol/restapi'

export const PushProtocolContext = createContext<{
  user: null | PushAPI
}>({
  user: null,
})

export const PushProtocolProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<null | PushAPI>(null)
  const { wallets } = useWallets()

  const updateUser = useCallback(async () => {
    const signer = await wallets[0]?.getEthersProvider()

    const user = await PushAPI.initialize(signer.getSigner(wallets[0].address))

    setUser(user)
  }, [wallets])

  useEffect(() => {
    if (wallets[0]?.address) {
      updateUser()
    }
  }, [wallets])

  return <PushProtocolContext.Provider value={{ user }}>{children}</PushProtocolContext.Provider>
}
