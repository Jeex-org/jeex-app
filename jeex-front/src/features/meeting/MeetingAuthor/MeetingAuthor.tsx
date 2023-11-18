'use client'
import { FC } from 'react'
import cn from 'classnames'
import { Avatar } from '@radix-ui/themes'
import styles from './MeetingAuthor.module.scss'

type MeetingAuthorProps = {
  name: string
  photoUrl?: string
}

export const MeetingAuthor: FC<MeetingAuthorProps> = ({ name, photoUrl }) => {
  return (
    <div className={cn(styles.author)}>
      <Avatar size="2" src={photoUrl} fallback="AT" radius="full" />
      <div className={styles.user}>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}
