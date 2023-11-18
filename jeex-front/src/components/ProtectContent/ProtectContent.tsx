'use client'
import { FC, PropsWithChildren } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@radix-ui/themes'
import styles from './ProtectContent.module.scss'

type ProtectContentProps = {}

export const ProtectContent: FC<PropsWithChildren<ProtectContentProps>> = ({ children }) => {
  const { user, login } = usePrivy()

  return (
    <>
      {!user?.wallet?.address ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>Please, connect wallet</h2>
            <div className={styles.wallet}>
              <Button onClick={login} variant="outline">
                Connect wallet
              </Button>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
