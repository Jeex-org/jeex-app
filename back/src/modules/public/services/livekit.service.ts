import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { ICreateRoomRequest } from '../request'
import { IRoomResponse } from '../response'
import { RoomServiceClient, CreateOptions, AccessToken, Room } from 'livekit-server-sdk'

@Injectable()
export class LivekitService {
  private readonly apiKey: string
  private readonly apiSecret: string
  private readonly websocketUrl: string

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('LIVEKIT_API_KEY')
    const apiSecret = this.configService.get<string>('LIVEKIT_API_SECRET')
    const websocketUrl = this.configService.get<string>('LIVEKIT_WEBSOCKET_URL')

    if (!apiKey || !apiSecret || !websocketUrl) {
      throw new Error('Env LIVEKIT_API_KEY or LIVEKIT_API_SECRET or LIVEKIT_WEBSOCKET_URL is not set')
    }

    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.websocketUrl = websocketUrl
  }

  public async createRoom(createOptions: CreateOptions): Promise<Room> {
    try {
      const client = new RoomServiceClient(this.websocketUrl, this.apiKey, this.apiSecret)

      const room = await client.createRoom(createOptions)

      return room
    } catch (error) {
      this.logger.error(error)
      throw new BadGatewayException(error)
    }
  }

  public async addGrant(userId: string, roomName: string): Promise<string> {
    try {
      const accessToken = new AccessToken(this.apiKey, this.apiSecret, {
        identity: userId,
      })

      accessToken.addGrant({ roomJoin: true, room: roomName })

      const token = accessToken.toJwt()

      return token
    } catch (error) {
      this.logger.error(error)
      throw new BadGatewayException(error)
    }
  }
}
