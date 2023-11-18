'use client'
import { FC, PropsWithChildren } from 'react'
import styles from './MeetingLiveKit.module.scss'

import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react'
import { Track } from 'livekit-client'

type MeetingLiveKitProps = {}

export const MeetingLiveKit: FC<PropsWithChildren<MeetingLiveKitProps>> = ({ children }) => {
  return (
    <LiveKitRoom
      className={styles.kit}
      video={true}
      audio={true}
      token={
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6IlRlc3Qgcm9vb20ifSwiaWF0IjoxNzAwMzEwNTc3LCJuYmYiOjE3MDAzMTA1NzcsImV4cCI6MTcwMDMzMjE3NywiaXNzIjoiQVBJRUZyWXUyaHFKckFEIiwic3ViIjoidGVzdCIsImp0aSI6InRlc3QifQ.GAmqI9JF4ls6r8vqDzkKHPGiJ_9J7HafdVw-DANuOVg'
      }
      connectOptions={{ autoSubscribe: false }}
      serverUrl={'wss://meet-cbgsn7fz.livekit.cloud'}
      data-lk-theme="default"
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      {children}
    </LiveKitRoom>
  )
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  )
  return (
    <GridLayout tracks={tracks}>
      <ParticipantTile />
    </GridLayout>
  )
}
