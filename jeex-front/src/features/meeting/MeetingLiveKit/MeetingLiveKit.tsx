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

type MeetingLiveKitProps = {
  token: string
}

export const MeetingLiveKit: FC<PropsWithChildren<MeetingLiveKitProps>> = ({ children, token }) => {
  return (
    <LiveKitRoom
      className={styles.kit}
      video={true}
      audio={true}
      token={token}
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
