"use client";
import { FC } from "react";
import Link from "next/link";
import { Room } from "livekit-server-sdk";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@/components/Article/Article";
import { Loader } from "@/components/Loader/Loader";

type RoomsListLoaderProps = {};

export const RoomsListLoader: FC<RoomsListLoaderProps> = () => {
  const {
    isLoading: isListLoading,
    error: roomsError,
    data: rooms,
  } = useQuery({
    queryKey: ["activeRoomsList"],
    queryFn: () =>
      fetch("/livekit/api/get-rooms-list").then((res) => res.json()),
  });

  return (
    <Article
      title="Rooms page"
      buttonUrl="/rooms/create"
      buttonText="Create new room"
    >
      {isListLoading && <Loader title="Loading..." />}
      {roomsError ? (
        <div>Something went wrong :(</div>
      ) : rooms?.length > 0 ? (
        <ul>
          {rooms.map((room: Room) => (
            <li key={room.sid}>
              <Link href={`/rooms/${room.name}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        !isListLoading && <p>No rooms found</p>
      )}
    </Article>
  );
};
