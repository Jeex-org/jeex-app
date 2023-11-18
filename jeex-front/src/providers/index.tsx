'use client'

import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider } from './QueryClientProvider'
import { PrivyProvider } from './PrivyProvider'
import { PushProtocolProvider } from './PushProtocolProvider'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider>
      <PrivyProvider>
        <PushProtocolProvider>{children}</PushProtocolProvider>
      </PrivyProvider>
    </QueryClientProvider>
  )
}
