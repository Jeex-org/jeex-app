'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
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
  const { room: roomId } = useParams()
  const params = new URLSearchParams(window.location.search)
  const liveKitToken = params.get('liveKitToken')
  const sid = params.get('sid')
  const [token, setToken] = useState('')

  const [roomOnline, setRoomOnline] = useState<Room | null>(null)

  const { wsUrl } = environments

  // const connectToRoom = useCallback(async () => {

  //   await room.connect(wsUrl, liveKitToken as string)

  //   setRoomOnline(room)
  // }, [token, wsUrl])

  // useEffect(() => {
  //   connectToRoom()
  // }, [connectToRoom])

  // TODO: Change return with real data
  return (
    <Article title={`Room ${roomId}`} backUrl="/rooms" isProtected>
      <PostMedia isOnline={true} />
      <div className={styles.actions}>
        {/* <div className={styles.cam}>
          <IconButton size="4" color="orange" variant="soft">
            <PencilSimple width="18" height="18" />
          </IconButton>
        </div> */}
        {/* <div className={styles.mic}>Mic</div> */}
        <div className={styles.call}>
          <Link href={`./${roomId}/call?liveKitToken=${liveKitToken}&sid=${sid}`}>
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
