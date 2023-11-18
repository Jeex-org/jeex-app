'use client'

import { useCallback, useEffect, useState } from 'react'
import { Room } from 'livekit-client'
import { useParams } from 'next/navigation'
import { Article } from '@/components/Article/Article'
import { environments } from '@/features/livekit/constants'
import { MeetingLayout } from '@/features/meeting/MeetingLayout/MeetingLayout'

export default function RoomOnlinePage() {
  const { room: roomName } = useParams()

  const handleClose = useCallback(() => {
    console.log('NAVIGATE')
  }, [])

  return (
    <Article title={`Room ${roomName}`} backUrl="/rooms">
      <MeetingLayout participants={[]} messages={[]} onClose={handleClose}></MeetingLayout>
    </Article>
  )
}
