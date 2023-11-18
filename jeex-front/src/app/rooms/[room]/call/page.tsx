'use client'

import { useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Article } from '@/components/Article/Article'
import { MeetingLayout } from '@/features/meeting/MeetingLayout/MeetingLayout'

export default function RoomOnlinePage() {
  const { room: roomName } = useParams()

  return (
    <Article title={`Room ${roomName}`} backUrl="/rooms">
      <MeetingLayout />
    </Article>
  )
}
