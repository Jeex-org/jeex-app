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
import { usePushProtocolChat } from '@/hooks/usePushProtocolChat'
import styles from './MeetingLayout.module.scss'

import participants from '@/mocks/participants.json'

type MeetingLayoutProps = {}

export const MeetingLayout: FC<MeetingLayoutProps> = () => {
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

  const token = new URLSearchParams(window.location.search).get('liveKitToken') as string
  const chatId = 'bc444c4c14be8e74efe86571cc1d5f8b8fd32e51b0e6a33aa16dec6a9260ec16'

  const messages = usePushProtocolChat(chatId)

  return (
    <div className={styles.meeting}>
      <MeetingLiveKit token={token}>
        <MeetingBar
          isVisible={isBarVisible}
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          toggleMic={handleMic}
          toggleCam={handleCam}
          onClose={handleClose}
        />

        {participants.length > 1 && <MeetingParticipants participants={participants} />}
      </MeetingLiveKit>

      <div className={styles.content}>
        <MeetingChat
          messages={messages}
          isOpen={isChatOpen}
          hasParticipants={[].length > 1}
          onClose={() => setIsChatOpen(false)}
        />
        <MeetingActions
          chatId={chatId}
          commentsCounter={messages.length}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
    </div>
  )
}
