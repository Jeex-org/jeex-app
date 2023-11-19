import { MessageItem } from '@/features/chat/types'
import { usePushProtocolUser } from '@/hooks/usePushProtocolUser'
import { shortenAddress } from '@/utils/common'
import { CONSTANTS, Message, MessageEvent, MessageEventType } from '@pushprotocol/restapi'
import { useEffect, useMemo, useState } from 'react'

export const usePushProtocolChat = (chatId: string) => {
  const { user } = usePushProtocolUser()
  const [messages, setMessages] = useState<MessageItem[]>([])

  useEffect(() => {
    console.log(user)
    if (user) {
      user
        .initStream([CONSTANTS.STREAM.CHAT], {
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
          // Listen for chat events
          stream.on(CONSTANTS.STREAM.CHAT, (data: MessageEvent) => {
            console.log(data)
            if (data.event === ('chat.message' as MessageEventType)) {
              const [_, address] = data.from.split(':')
              const shortAddress = shortenAddress(address)
              setMessages((prev) => [
                ...prev,
                {
                  nickname: shortAddress,
                  photoUrl: '',
                  id: `${data.from}:${data.timestamp}`,
                  text: data.message.content,
                },
              ])
            }
          })

          stream.on(CONSTANTS.STREAM.CHAT_OPS, (data: any) => {
            console.log(data)
          })

          stream.on(CONSTANTS.STREAM.CONNECT, (data) => {
            console.log('Connect data:', data)
          })

          // Connect stream, Important to setup up listen first
          stream.connect()
        })
    }
  }, [user])

  return useMemo(() => messages, [messages])
}
