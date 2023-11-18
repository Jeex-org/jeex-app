'use client'
import { FC } from 'react'
import Link from 'next/link'
import { Room } from 'livekit-server-sdk'
import { useQuery } from '@tanstack/react-query'
import { Article } from '@/components/Article/Article'
import { Loader } from '@/components/Loader/Loader'
import { Feed } from '@/features/explore/Feed/Feed'
import { PostPreview } from '@/features/explore/PostPreview/PostPreview'

type RoomsListLoaderProps = {}

export const RoomsListLoader: FC<RoomsListLoaderProps> = () => {
  // TODO: Use real vars
  const isListLoading = false
  const rooms: any = []
  const roomsError = false

  const fakeContent = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <Article title="Rooms page" buttonUrl="/rooms/create" buttonText="Create new room" isProtected>
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
        // !isListLoading && <p>No rooms found</p>
        !isListLoading && (
          <Feed>
            {fakeContent.map((item) => (
              <PostPreview key={item} title="Room name" url="/rooms/lololo" isOnline />
            ))}
          </Feed>
        )
      )}
    </Article>
  )
}
