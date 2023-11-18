"use client";
import { FC } from "react";
import cn from "classnames";
import { MeetingAuthor } from "@/features/meeting/MeetingAuthor/MeetingAuthor";
import { MeetingControl } from "@/features/meeting/MeetingControl/MeetingControl";
import styles from "./MeetingBar.module.scss";

type MeetingBarProps = {
  isVisible: boolean;
  isMicOn?: boolean;
  isCameraOn?: boolean;
  isSubscribed?: boolean;
  followers?: number;
  toggleMic: (muteState: boolean) => void;
  toggleCamera: (muteState: boolean) => void;
  onSubscribe?: () => void;
  onClose: () => void;
};

export const MeetingBar: FC<MeetingBarProps> = ({
  isVisible,
  isMicOn,
  isCameraOn,
  isSubscribed,
  followers,
  toggleMic,
  toggleCamera,
  onSubscribe,
  onClose,
}) => {
  return (
    <div className={cn(styles.bar, { [styles.visible]: isVisible })}>
      <div className={styles.author}>
        <MeetingAuthor
          name="ChuckNorris"
          photoUrl="/images/avatar.png"
          isSubscribed={isSubscribed}
          followers={followers}
          onSubscribe={onSubscribe}
        />
      </div>
      <div className={styles.controls}>
        {/* <MeetingControl icon="cameraRotate" onClick={() => {}} /> */}
        {isCameraOn ? (
          <MeetingControl
            text="Turn off camera"
            icon="videoCamera"
            onClick={() => toggleCamera(true)}
          />
        ) : (
          <MeetingControl
            text="Turn on camera"
            icon="videoCameraSlash"
            onClick={() => toggleCamera(false)}
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
          onClick={onClose}
        />
      </div>
    </div>
  );
};
