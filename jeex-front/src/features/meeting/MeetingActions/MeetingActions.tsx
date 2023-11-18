'use client'
import React, { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import styles from './MeetingActions.module.scss'
import { usePushProtocolUser } from '@/hooks/usePushProtocolUser'
import { Button } from '@radix-ui/themes'

type MeetingActionsProps = {
  commentsCounter?: number
  isChatOpen?: boolean
  chatId: string
  onToggleChat: () => void
}

export const MeetingActions: FC<MeetingActionsProps> = ({ isChatOpen, chatId }) => {
  const { user } = usePushProtocolUser()
  const [message, setMessage] = useState('')

  const messageChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }, [])

  const buttonClickHandler = useCallback(async () => {
    if (user) {
      await user.chat.send(chatId, {
        type: 'Text',
        content: message,
      })

      setMessage('')
    }
  }, [user, message])

  return (
    <div
      className={cn(styles.actions, { [styles.focused]: true }, { [styles.inFrame]: isChatOpen })}
    >
      <div className={styles.comments}>
        <div className={styles.newComment} style={{ display: 'flex', alignItems: 'center' }}>
          <textarea
            value={message}
            onChange={messageChangeHandler}
            className={styles.field}
            placeholder="Add new comment..."
          />
          <Button onClick={buttonClickHandler}>Send</Button>
        </div>
      </div>
    </div>
  )
}
