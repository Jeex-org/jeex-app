import express from 'express'
import { RoomServiceClient, CreateOptions, AccessToken } from 'livekit-server-sdk'
import { config } from 'dotenv'

config()
const app = express()
const port = 3000 // Можно выбрать любой порт

// Настройка клиента LiveKit
const livekitHost = process.env.WEBSOCKET_URL! // URL вашего экземпляра LiveKit
const apiKey = process.env.API_KEY! // API ключ
const apiSecret = process.env.API_SECRET! // Секретный ключ

const client = new RoomServiceClient(livekitHost, apiKey, apiSecret)
// Маршрут для создания комнаты
app.post('/create-room', async (req, res) => {
  try {
    const createData: CreateOptions = {
      name: 'Test room', // Название комнаты
    }

    const room = await client.createRoom(createData)

    res.json(room)
  } catch (error) {
    console.error('Error creating room:', error)
    res.status(500).send('Error creating room')
  }
})

app.post('/generate-token', (req, res) => {
  const { roomName, participantIdentity } = {
    roomName: 'Test rooom',
    participantIdentity: 'test',
  }

  if (!roomName || !participantIdentity) {
    return res.status(400).send('Room name and participant identity are required')
  }

  try {
    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
    })

    // Добавление прав доступа к комнате
    accessToken.addGrant({ roomJoin: true, room: roomName })

    // Генерация JWT токена
    const token = accessToken.toJwt()
    res.json({ token })
  } catch (error) {
    console.error('Error generating token:', error)
    res.status(500).send('Error generating token')
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
