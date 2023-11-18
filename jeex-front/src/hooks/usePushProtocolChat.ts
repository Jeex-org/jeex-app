import { usePushProtocolUser } from '@/hooks/usePushProtocolUser'
import { CONSTANTS } from '@pushprotocol/restapi'
import { useEffect, useMemo, useState } from 'react'

export const usePushProtocolChat = (chatId: string) => {
  const { user } = usePushProtocolUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log(user)
    if (user) {
      user
        .initStream([CONSTANTS.STREAM.CHAT, CONSTANTS.STREAM.CHAT_OPS], {
          filter: {
            channels: ['*'], // pass in specific channels to only listen to those
            chats: ['*'], // pass in specific chat ids to only listen to those
          },
          connection: {
            retries: 3, // number of retries in case of error
          },
          raw: false, // enable true to show all data
        })
        .then((stream) => {
          console.log('CONNECTED TO ROOM')
          // Listen for chat events
          stream.on(CONSTANTS.STREAM.CHAT, (data: any) => {
            console.log(data)
          })

          stream.on(CONSTANTS.STREAM.CHAT_OPS, (data: any) => {
            console.log(data)
          })

          // Connect stream, Important to setup up listen first
          stream.connect()
        })
    }
  }, [user])

  return useMemo(() => messages, [])
}
