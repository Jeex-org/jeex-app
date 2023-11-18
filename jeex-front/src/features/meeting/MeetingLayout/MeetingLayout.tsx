"use client";
import { FC, useCallback, useState } from "react";
import { MeetingVideoGrid } from "@/features/meeting/MeetingVideoGrid/MeetingVideoGrid";
import { MeetingBar } from "@/features/meeting/MeetingBar/MeetingBar";
import { MeetingChat } from "@/features/meeting/MeetingChat/MeetingChat";
import { MeetingParticipants } from "@/features/meeting/MeetingParticipants/MeetingParticipants";
import { MeetingActions } from "@/features/meeting/MeetingActions/MeetingActions";
import { MessageItem } from "@/features/chat/types";
import { Person } from "@/components/User/User";
import styles from "./MeetingLayout.module.scss";

type MeetingLayoutProps = {
  participants: Person[];
  messages: MessageItem[];
  followers?: number;
  likes?: number;
  onClose: () => void;
};

export const MeetingLayout: FC<MeetingLayoutProps> = ({
  participants,
  messages,
  followers,
  likes,
  onClose,
}) => {
  const [isBarVisible, setIsBarVisible] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleMic = useCallback((micState: boolean) => {
    setIsMicOn(!micState);
  }, []);

  const handleCam = useCallback((camState: boolean) => {
    setIsCameraOn(!camState);
  }, []);

  const handleSubscribe = useCallback(() => {
    setIsSubscribed(!isSubscribed);
  }, [isSubscribed]);

  return (
    <div className={styles.meeting}>
      <MeetingVideoGrid
        participants={participants}
        onClick={() => setIsBarVisible(!isBarVisible)}
      />
      <MeetingBar
        isVisible={isBarVisible}
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isSubscribed={isSubscribed}
        followers={followers}
        toggleMic={handleMic}
        toggleCamera={handleCam}
        onSubscribe={handleSubscribe}
        onClose={onClose}
      />
      <div className={styles.content}>
        <MeetingChat
          messages={messages}
          isOpen={isChatOpen}
          hasParticipants={participants.length > 1}
          onClose={() => setIsChatOpen(false)}
        />
        <MeetingActions
          commentsCounter={messages.length}
          likes={likes}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
      {participants.length > 1 && (
        <MeetingParticipants participants={participants} />
      )}
    </div>
  );
};
