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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6IjEyMzQifSwiaWF0IjoxNzAwMzM4NDU0LCJuYmYiOjE3MDAzMzg0NTQsImV4cCI6MTcwMDM2MDA1NCwiaXNzIjoiQVBJRUZyWXUyaHFKckFEIiwic3ViIjoiNCIsImp0aSI6IjQifQ.UauLMy4bSvVm2lf3woeyaeRcwZ8CgAA3rZaFn7g-hVQ'
      }
      connectOptions={{ autoSubscribe: false }}
      serverUrl={'wss://meet-cbgsn7fz.livekit.cloud'}
      data-lk-theme="default"
    >
      <div className={styles.mainVideo}>
        <MyVideoConference />
      </div>
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
