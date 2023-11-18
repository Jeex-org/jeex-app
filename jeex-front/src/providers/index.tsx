'use client'

import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider } from './QueryClientProvider'
import { PrivyProvider } from './PrivyProvider'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider>
      <PrivyProvider>{children}</PrivyProvider>
    </QueryClientProvider>
  )
}
