'use client'
import { FC, useCallback, useState } from 'react'
import { MeetingBar } from '@/features/meeting/MeetingBar/MeetingBar'
import { MeetingChat } from '@/features/meeting/MeetingChat/MeetingChat'
import { MeetingParticipants } from '@/features/meeting/MeetingParticipants/MeetingParticipants'
import { MeetingActions } from '@/features/meeting/MeetingActions/MeetingActions'
import { MeetingLiveKit } from '../MeetingLiveKit/MeetingLiveKit'
import { MessageItem } from '@/features/chat/types'
import { Person } from '@/components/User/User'
import styles from './MeetingLayout.module.scss'

type MeetingLayoutProps = {
  participants: Person[]
  messages: MessageItem[]
  onClose: () => void
}

export const MeetingLayout: FC<MeetingLayoutProps> = ({ participants, messages, onClose }) => {
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

  return (
    <div className={styles.meeting}>
      <MeetingLiveKit>
        <MeetingBar
          isVisible={isBarVisible}
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          toggleMic={handleMic}
          toggleCam={handleCam}
          onClose={onClose}
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
          commentsCounter={messages.length}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
      {participants.length > 1 && <MeetingParticipants participants={participants} />}
    </div>
  )
}
