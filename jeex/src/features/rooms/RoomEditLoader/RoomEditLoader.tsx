"use client";
import { FC, useState } from "react";
import { NewRoom } from "@/features/rooms/types";
import { RoomForm } from "@/features/rooms/RoomForm/RoomForm";
import { Article } from "@/components/Article/Article";

type RoomEditLoaderProps = {};

export const RoomEditLoader: FC<RoomEditLoaderProps> = () => {
  const [roomData, setRoomDate] = useState<NewRoom | null>(null);

  return (
    <Article title="Edit room" backUrl="/rooms">
      <RoomForm onSubmit={(room) => setRoomDate(room)} />
    </Article>
  );
};
