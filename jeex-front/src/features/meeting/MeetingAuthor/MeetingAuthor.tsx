'use client'
import { FC } from 'react'
import cn from 'classnames'
import { usePrivy } from '@privy-io/react-auth'
import { Avatar } from '@radix-ui/themes'
import styles from './MeetingAuthor.module.scss'
import { shortenAddress } from '@/utils/common'

type MeetingAuthorProps = {
  name: string
  photoUrl?: string
}

export const MeetingAuthor: FC<MeetingAuthorProps> = ({ name, photoUrl }) => {
  const { user } = usePrivy()
  const userName = user?.wallet?.address

  return (
    <div className={cn(styles.author)}>
      <Avatar size="2" src={photoUrl} fallback="AT" radius="full" />
      <div className={styles.user}>
        <div className={styles.name}>{shortenAddress(userName)}</div>
      </div>
    </div>
  )
}
