'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './MeetingActions.module.scss'

type MeetingActionsProps = {
  commentsCounter?: number
  isChatOpen?: boolean
  onToggleChat: () => void
}

export const MeetingActions: FC<MeetingActionsProps> = ({ isChatOpen }) => {
  return (
    <div
      className={cn(styles.actions, { [styles.focused]: true }, { [styles.inFrame]: isChatOpen })}
    >
      <div className={styles.comments}>
        <div className={styles.newComment}>
          <textarea className={styles.field} placeholder="Add new comment..." />
        </div>
      </div>
    </div>
  )
}
