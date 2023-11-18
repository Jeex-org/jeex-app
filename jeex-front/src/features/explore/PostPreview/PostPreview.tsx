'use client'
import { FC } from 'react'
import Link from 'next/link'
import { AspectRatio } from '@radix-ui/themes'
import { UserCircle } from '@phosphor-icons/react'
import styles from './PostPreview.module.scss'

type PostPreviewProps = {
  title: string
  url: string
  cover?: string
  isOnline?: boolean
  usersOnline?: number
}

export const PostPreview: FC<PostPreviewProps> = ({
  title,
  url,
  cover = '/images/jeex.png',
  isOnline,
  usersOnline = 0,
}) => {
  return (
    <Link href={url} className={styles.post}>
      <AspectRatio ratio={8 / 4} className={styles.media}>
        <img src={cover} alt="" className={styles.cover} />
        {isOnline && <div className={styles.online} />}
      </AspectRatio>
      <footer className={styles.footer}>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.users}>
          <UserCircle weight="bold" /> {usersOnline}
        </div>
      </footer>
    </Link>
  )
}
