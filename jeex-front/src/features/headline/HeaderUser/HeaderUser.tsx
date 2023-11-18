'use client'
import { FC, useMemo } from 'react'
import { Avatar, Button } from '@radix-ui/themes'
import { Envelope } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { UserMenuItem } from '../types'
import styles from './HeaderUser.module.scss'
import { usePrivy } from '@privy-io/react-auth'

type HeaderUserProps = {
  className?: string
}

export const HeaderUser: FC<HeaderUserProps> = ({ className }) => {
  const { user, connectWallet, login, logout } = usePrivy()

  const isLoggedIn = useMemo(() => user?.wallet?.address, [user?.wallet?.address])

  return (
    <DropdownMenu.Root>
      {!isLoggedIn ? (
        <Button onClick={login} variant="outline">
          Connect wallet
        </Button>
      ) : (
        <>
          <DropdownMenu.Trigger asChild>
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="AT"
              radius="full"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>
              <DropdownMenu.Item onClick={logout} className={styles.DropdownMenuItem}>
                Log out <div className={styles.RightSlot}>⌘+E</div>
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </>
      )}
    </DropdownMenu.Root>
  )
}
