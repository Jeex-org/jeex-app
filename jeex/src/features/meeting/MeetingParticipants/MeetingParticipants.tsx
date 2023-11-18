"use client";
import { FC } from "react";
import cn from "classnames";
import { Crown, MicrophoneSlash } from "@phosphor-icons/react";
import { Avatar } from "@radix-ui/themes";
import { Person } from "@/components/User/User";
import styles from "./MeetingParticipants.module.scss";

export type Participant = Person & {
  isMuted?: boolean;
};

type MeetingParticipantsProps = {
  participants: Participant[];
};

export const MeetingParticipants: FC<MeetingParticipantsProps> = ({
  participants,
}) => {
  return (
    <div className={cn(styles.participants)}>
      <ul className={styles.list}>
        {participants.map(
          (participant, index) =>
            index < 4 && (
              <li className={styles.item} key={index}>
                {index !== 0 ? (
                  // If camera off
                  <Avatar
                    size="6"
                    src={participant.photoUrl}
                    fallback="AT"
                    radius="none"
                    className={styles.avatar}
                  />
                ) : (
                  // If camera on
                  <video
                    src="/video/cat.webm"
                    autoPlay
                    muted
                    loop
                    className={styles.video}
                  />
                )}
                {index === 1 && (
                  // If mic off
                  <div className={styles.mic}>
                    <MicrophoneSlash weight="fill" />
                  </div>
                )}
                {index === 2 && (
                  // If owner of the stream
                  <div className={styles.owner}>
                    <Crown weight="fill" />
                  </div>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};
