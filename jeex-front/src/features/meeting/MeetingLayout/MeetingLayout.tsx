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

// TODO: remove this mocks
import chat from '@/mocks/chat.json'
import participantsList from '@/mocks/participants.json'

type MeetingLayoutProps = {}

export const MeetingLayout: FC<MeetingLayoutProps> = () => {
  const messages = chat as MessageItem[]
  const participants = participantsList as Person[]

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
          commentsCounter={messages.length}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
      {participants.length > 1 && <MeetingParticipants participants={participants} />}
    </div>
  )
}
