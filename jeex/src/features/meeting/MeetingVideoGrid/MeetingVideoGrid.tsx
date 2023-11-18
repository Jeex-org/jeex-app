"use client";
import { FC } from "react";
import cn from "classnames";
import { Person } from "@/components/User/User";
import styles from "./MeetingVideoGrid.module.scss";

type MeetingVideoGridProps = {
  participants: Person[];
  onClick: () => void;
};

export const MeetingVideoGrid: FC<MeetingVideoGridProps> = ({
  participants,
  onClick,
}) => {
  return (
    <div className={styles.grid} onClick={onClick}>
      <video
        src="/video/cat.webm"
        autoPlay
        muted
        loop
        className={styles.video}
      />
      <div
        className={cn(
          styles.participants,
          styles[`participants-${participants.length}`]
        )}
      >
        {participants.map((person, index) => (
          <div key={index} className={styles.participant}>
            {/* <div className={styles.avatar}>
              <img src={person.photoUrl} alt={person.nickName} />
            </div> */}
            {/* <div className={styles.info}>
              <div className={styles.nickName}>{person.nickName}</div>
              <div className={styles.fullName}>{person.fullName}</div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
