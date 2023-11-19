import React, { FC, PropsWithChildren } from 'react'
import { PrivyProvider as LPrivyProvider } from '@privy-io/react-auth'

export const PrivyProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LPrivyProvider
      appId="clp4cfxix05acl00f5slgrf2f"
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '/images/jeex-logo.png',
        },
      }}
    >
      {children}
    </LPrivyProvider>
  )
}
