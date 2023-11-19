'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Room } from 'livekit-client'
import { Button, IconButton } from '@radix-ui/themes'
import { Article } from '@/components/Article/Article'
import { environments } from '@/features/livekit/constants'
import { PostMedia } from '@/features/explore/PostMedia/PostMedia'
import { RoomConnector } from '@/features/rooms/RoomConnector/RoomConnector'
import { Loader } from '@/components/Loader/Loader'
import styles from './RoomLoader.module.scss'

type RoomLoaderProps = {}

export const RoomLoader: FC<RoomLoaderProps> = () => {
  const { room: roomName } = useParams()
  const userName = 'jeex-user'
  const [token, setToken] = useState('')

  const [roomOnline, setRoomOnline] = useState<Room | null>(null)

  const { wsUrl } = environments

  // const connectToRoom = useCallback(
  //   async (tkn: string) => {
  //     const room = new Room()
  //     const result = await room.connect(wsUrl, tkn || token)
  //     setRoomOnline(room)
  //   },
  //   [token, wsUrl],
  // )

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const resp = await fetch(
  //         `/livekit/api/get-participant-token?room=${roomName}&username=${userName}`,
  //       )
  //       const data = await resp.json()
  //       setToken(data.token)
  //       connectToRoom(data.token)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   })()
  // }, [connectToRoom, roomName])

  // TODO: Change return with real data
  return (
    <Article title={`Room ${roomName}`} backUrl="/rooms" isProtected>
      <PostMedia isOnline={true} />
      <div className={styles.actions}>
        {/* <div className={styles.cam}>
          <IconButton size="4" color="orange" variant="soft">
            <PencilSimple width="18" height="18" />
          </IconButton>
        </div> */}
        {/* <div className={styles.mic}>Mic</div> */}
        <div className={styles.call}>
          <Link href={`./${roomOnline?.name}/call`}>
            <Button color="crimson" size="4" className={styles.callButton}>
              Call
            </Button>
          </Link>
        </div>
      </div>
    </Article>
  )

  // return (
  //   <Article title={`Room ${roomName}`} backUrl="/rooms" isProtected>
  //     {token === '' ? (
  //       <Loader title="Getting token..." />
  //     ) : (
  //       <>
  //         <div>Room online: {roomOnline?.name}</div>
  //         <Link href={`./${roomOnline?.name}/call`}>Call</Link>{' '}
  //         <Link href={`./${roomOnline?.name}/edit`}>Edit</Link>
  //         {roomOnline && <RoomConnector room={roomOnline} />}
  //       </>
  //     )}
  //   </Article>
  // )
}
