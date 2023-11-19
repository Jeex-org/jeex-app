'use client'
import { FC, useCallback, useEffect } from 'react'
import cn from 'classnames'
import { usePrivy } from '@privy-io/react-auth'

import { useDisconnectButton, useRoomContext } from '@livekit/components-react'

import { buildAvatar, shortenAddress } from '@/utils/common'
import { MeetingAuthor } from '@/features/meeting/MeetingAuthor/MeetingAuthor'
import { MeetingControl } from '@/features/meeting/MeetingControl/MeetingControl'
import styles from './MeetingBar.module.scss'

type MeetingBarProps = {
  isVisible: boolean
  isMicOn?: boolean
  isCamOn?: boolean
  toggleMic: (muteState: boolean) => void
  toggleCam: (muteState: boolean) => void
  onClose: () => void
}

export const MeetingBar: FC<MeetingBarProps> = ({
  isVisible,
  isMicOn,
  isCamOn,
  toggleMic,
  toggleCam,
  onClose,
}) => {
  const { user } = usePrivy()
  const { buttonProps } = useDisconnectButton({ stopTracks: true })
  const room = useRoomContext()

  useEffect(() => {
    if (room.state !== 'connected') return
    room.localParticipant.setMicrophoneEnabled(!!isMicOn)
  }, [isCamOn, room])

  useEffect(() => {
    if (room.state !== 'connected') return
    room.localParticipant.setCameraEnabled(!!isCamOn)
  }, [isCamOn, room])

  const handleDisconnect = useCallback(() => {
    buttonProps.onClick()
    onClose()
  }, [])

  return (
    <div className={cn(styles.bar, { [styles.visible]: isVisible })}>
      <div className={styles.author}>
        <MeetingAuthor
          name={shortenAddress(user?.wallet?.address)}
          photoUrl={buildAvatar(user?.wallet?.address)}
        />
      </div>
      <div className={styles.controls}>
        {/* <MeetingControl icon="cameraRotate" onClick={() => {}} /> */}
        {isCamOn ? (
          <MeetingControl
            text="Turn off camera"
            icon="videoCamera"
            onClick={() => toggleCam(true)}
          />
        ) : (
          <MeetingControl
            text="Turn on camera"
            icon="videoCameraSlash"
            onClick={() => toggleCam(false)}
          />
        )}
        {isMicOn ? (
          <MeetingControl
            text="Turn off microphone"
            icon="microphone"
            onClick={() => toggleMic(true)}
          />
        ) : (
          <MeetingControl
            text="Turn on microphone"
            icon="microphoneSlash"
            onClick={() => toggleMic(false)}
          />
        )}
        <MeetingControl
          text="Leave the meeting"
          icon="phone"
          color="red"
          // disabled={buttonProps.disabled}
          onClick={handleDisconnect}
        />
      </div>
    </div>
  )
}
