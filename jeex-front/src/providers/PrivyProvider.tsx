import React, { FC, PropsWithChildren } from 'react'
import { PrivyProvider as LPrivyProvider } from '@privy-io/react-auth'

export const PrivyProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LPrivyProvider
      appId="clou7wxo3001rl40fe3hhsnwk"
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
      }}
    >
      {children}
    </LPrivyProvider>
  )
}
