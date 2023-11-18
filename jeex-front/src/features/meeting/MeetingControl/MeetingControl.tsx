'use client'
import { FC } from 'react'
import cn from 'classnames'
import {
  CameraRotate,
  ChartBar,
  ChatText,
  Heart,
  Microphone,
  MicrophoneSlash,
  Phone,
  ShareFat,
  VideoCamera,
  VideoCameraSlash,
  PaperPlaneTilt,
} from '@phosphor-icons/react'
import styles from './MeetingControl.module.scss'

type MeetingIcon =
  | 'cameraRotate'
  | 'chartBar'
  | 'chatText'
  | 'heart'
  | 'heartFill'
  | 'microphone'
  | 'microphoneSlash'
  | 'shareFat'
  | 'phone'
  | 'plane'
  | 'videoCamera'
  | 'videoCameraSlash'

type MeetingControlProps = {
  className?: string
  icon: MeetingIcon
  color?: 'white' | 'red'
  isActive?: boolean
  text: string
  label?: string
  type?: 'normal' | 'compact'
  disabled?: boolean
  onClick: () => void
}

export const MeetingControl: FC<MeetingControlProps> = ({
  className,
  icon,
  color = 'white',
  isActive,
  text,
  label,
  type = 'normal',
  disabled,
  onClick,
}) => {
  const icons = {
    cameraRotate: <CameraRotate weight="fill" />,
    chartBar: <ChartBar weight="fill" />,
    chatText: <ChatText weight="fill" />,
    heart: <Heart weight="regular" />,
    plane: <PaperPlaneTilt weight="regular" />,
    heartFill: <Heart weight="fill" />,
    microphone: <Microphone weight="fill" />,
    microphoneSlash: <MicrophoneSlash weight="fill" />,
    phone: <Phone weight="fill" />,
    shareFat: <ShareFat weight="fill" />,
    videoCamera: <VideoCamera weight="fill" />,
    videoCameraSlash: <VideoCameraSlash weight="fill" />,
  }

  return (
    <div
      className={cn(
        styles.container,
        {
          [styles.compact]: type === 'compact',
        },
        className,
      )}
    >
      <button
        disabled={disabled}
        title={text}
        className={cn(styles.control, styles[color], {
          [styles.active]: isActive,
        })}
        onClick={onClick}
      >
        {icons[icon]}
      </button>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
