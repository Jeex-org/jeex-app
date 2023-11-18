'use client'
import { FC, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MeetingBar } from '@/features/meeting/MeetingBar/MeetingBar'
import { MeetingChat } from '@/features/meeting/MeetingChat/MeetingChat'
import { MeetingParticipants } from '@/features/meeting/MeetingParticipants/MeetingParticipants'
import { MeetingActions } from '@/features/meeting/MeetingActions/MeetingActions'
import { MeetingLiveKit } from '../MeetingLiveKit/MeetingLiveKit'
import { MessageItem } from '@/features/chat/types'
import { Person } from '@/components/User/User'
import styles from './MeetingLayout.module.scss'
import { usePushProtocolChat } from '@/hooks/usePushProtocolChat'

type MeetingLayoutProps = {
  participants: Person[]
}

export const MeetingLayout: FC<MeetingLayoutProps> = ({ participants }) => {
  const router = useRouter()
  const [isBarVisible, setIsBarVisible] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCamOn, setIsCamOn] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleMic = useCallback((micState: boolean) => {
    setIsMicOn(!micState)
  }, [])

  const handleCam = useCallback((camState: boolean) => {
    setIsCamOn(!camState)
  }, [])

  const handleClose = useCallback(() => {
    router.push('.')
  }, [])

  const messages = usePushProtocolChat(
    'fef148cf5ac64a9139ae48cd884f7ce09ca84ae5bc0347d5587815607f2e9ce5',
  )

  return (
    <div className={styles.meeting}>
      <MeetingLiveKit>
        <MeetingBar
          isVisible={isBarVisible}
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          toggleMic={handleMic}
          toggleCam={handleCam}
          onClose={handleClose}
        />
      </MeetingLiveKit>

      <div className={styles.content}>
        <MeetingChat
          messages={messages}
          isOpen={isChatOpen}
          hasParticipants={participants.length > 1}
          onClose={() => setIsChatOpen(false)}
        />
        <MeetingActions
          chatId={'fef148cf5ac64a9139ae48cd884f7ce09ca84ae5bc0347d5587815607f2e9ce5'}
          commentsCounter={messages.length}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
      {participants.length > 1 && <MeetingParticipants participants={participants} />}
    </div>
  )
}
