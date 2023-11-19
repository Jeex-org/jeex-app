'use client'
import { FC } from 'react'
import cn from 'classnames'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { NewRoom } from '../types'
import axios, { AxiosResponse } from 'axios'
import { usePrivy } from '@privy-io/react-auth'

type CreateRoomFormProps = {
  className?: string
  newRoom: NewRoom
}

export const CreateRoomSender: FC<CreateRoomFormProps> = ({ className, newRoom }) => {
  const { getAccessToken } = usePrivy()

  const { isLoading, error, data } = useQuery({
    queryKey: ['createRoomQuery'],
    queryFn: async () => {
      return await axios
        .post<
          never,
          AxiosResponse<{
            room: {
              id: number
              sid: string
              name: string
            }
            participant: {
              id: number
              roomId: number
              token: string
              userId: string
            }
          }>
        >(
          `https://jeex-back-dgn2x.ondigitalocean.app/public/room`,
          {
            name: newRoom.name,
          },
          {
            headers: {
              Authorization: await getAccessToken(),
            },
          },
        )
        .then((response) => response.data)
    },
  })

  return (
    <div className={cn(className)}>
      {isLoading ? (
        <div>Creating...</div>
      ) : (
        <div>
          {error ? (
            <p>Something went wrong :(</p>
          ) : (
            <p>
              Room{' '}
              <Link
                href={`/rooms/${data?.room.id}?liveKitToken=${data?.participant.token}&sid=${data?.room.sid}`}
              >
                <b>{data?.room.name}</b>
              </Link>{' '}
              is created!
            </p>
          )}
        </div>
      )}
    </div>
  )
}
