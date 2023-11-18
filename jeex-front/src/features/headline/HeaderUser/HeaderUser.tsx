'use client'
import { FC, useEffect, useMemo } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Avatar, Button } from '@radix-ui/themes'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { buildAvatar } from '@/utils/common'
import styles from './HeaderUser.module.scss'

type HeaderUserProps = {
  className?: string
}

export const HeaderUser: FC<HeaderUserProps> = ({ className }) => {
  const { user, connectWallet, login, logout, getAccessToken } = usePrivy()

  const isLoggedIn = useMemo(() => user?.wallet?.address, [user?.wallet?.address])
  useEffect(() => {
    if (user?.wallet) {
      getAccessToken().then((res) => console.log(res))
    }
  }, [user])
  return (
    <DropdownMenu.Root>
      {!isLoggedIn ? (
        <Button onClick={login} variant="outline">
          Connect wallet
        </Button>
      ) : (
        <>
          <DropdownMenu.Trigger asChild>
            <Avatar size="3" src={buildAvatar(user?.wallet?.address)} fallback="AT" radius="none" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>
              <DropdownMenu.Item onClick={logout} className={styles.DropdownMenuItem}>
                Log out
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </>
      )}
    </DropdownMenu.Root>
  )
}
