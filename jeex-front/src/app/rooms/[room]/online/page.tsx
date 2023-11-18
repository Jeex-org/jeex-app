"use client";

import { useCallback, useEffect, useState } from "react";
import { Room, Track } from "livekit-client";
import { useParams } from "next/navigation";
import { RoomOnline } from "@/features/rooms/RoomOnline/RoomOnline";
import { Article } from "@/components/Article/Article";
import { environments } from "@/features/livekit/constants";
import { MeetingLayout } from "@/features/meeting/MeetingLayout/MeetingLayout";

export default function RoomOnlinePage() {
  const { room: roomName } = useParams();
  const userName = "jeex-user";
  const [token, setToken] = useState("");

  const [roomOnline, setRoomOnline] = useState<Room | null>(null);
  const [isDefaultDevicesSet, setIsDefaultDevicesSet] = useState(false);

  const { wsUrl } = environments;

  const connectToRoom = useCallback(
    async (tkn: string) => {
      const room = new Room();
      const result = await room.connect(wsUrl, tkn || token);
      setRoomOnline(room);
    },
    [token, wsUrl]
  );

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/livekit/api/get-participant-token?room=${roomName}&username=${userName}`
        );
        const data = await resp.json();
        setToken(data.token);
        connectToRoom(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [connectToRoom, roomName]);

  const handleClose = useCallback(() => {
    console.log("NAVIGATE");
  }, []);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <Article title={`Room ${roomName}`} backUrl="/rooms">
      <div>Room online: {roomOnline?.name}</div>
      {roomOnline && (
        <MeetingLayout
          participants={[]}
          messages={[]}
          followers={385}
          likes={42}
          onClose={handleClose}
        ></MeetingLayout>
      )}
    </Article>
  );
}
