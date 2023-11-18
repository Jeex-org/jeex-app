import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { ICreateRoomRequest, IJoinRoomRequest } from '../request'
import { IRoomListResponse, IRoomParticipantResponse, IRoomResponse, IRoomWithParticipantResponse } from '../response'
import { RoomServiceClient, CreateOptions, AccessToken } from 'livekit-server-sdk'
import { LivekitService } from './livekit.service'
import { RoomParticipantRepositoryService, RoomRepositoryService } from 'src/modules/repositories'
import { PaginationParamsQuery } from '../queries'
import { UserService } from './user.service'

@Injectable()
export class RoomService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly livekitService: LivekitService,
    private readonly userService: UserService,
    private readonly roomRepo: RoomRepositoryService,
    private readonly roomParticipantRepo: RoomParticipantRepositoryService,
  ) {}

  public async createRoom(createRoomRequest: ICreateRoomRequest): Promise<IRoomWithParticipantResponse> {
    const user = await this.userService.getUserByAddress(createRoomRequest.userAddress)

    const roomLivekit = await this.livekitService.createRoom({
      name: createRoomRequest.name,
    })

    if (roomLivekit instanceof Error) {
      throw new BadRequestException('Error when creating a new room in livekit')
    }

    const room = await this.roomRepo.createRoom({
      name: roomLivekit.name,
      sid: roomLivekit.sid,
    })

    if (room instanceof Error) {
      throw new BadRequestException('Error when creating a new room in DB')
    }

    const participant = await this.addParticipantToRoom(room.id, user.id)
    // Implement your logic here
    return {
      room: {
        id: room.id,
        sid: room.sid,
        name: room.name,
      },
      participant: {
        id: participant.id,
        token: participant.token,
        name: participant.name,
        roomId: participant.roomId,
        userId: participant.userId,
      },
    }
  }

  public async getAllRooms(paginationParams: PaginationParamsQuery): Promise<IRoomListResponse> {
    const rooms = await this.roomRepo.getAllRooms(paginationParams)

    return {
      rooms: rooms.rooms.map((room) => ({
        id: room.id,
        sid: room.sid,
        name: room.name,
      })),
      total: rooms.total,
    }
  }

  public async getRoomById(roomId: number): Promise<IRoomResponse> {
    const room = await this.roomRepo.getRoomById(roomId)

    if (!room) {
      throw new NotFoundException('Room not found')
    }

    return {
      id: room.id,
      sid: room.sid,
      name: room.name,
    }
  }

  public async addParticipantToRoom(roomId: number, userId: number): Promise<IRoomParticipantResponse> {
    const room = await this.roomRepo.getRoomById(roomId)

    if (!room) {
      throw new NotFoundException('Room not found')
    }

    const user = await this.userService.getUserById(userId)

    if (user instanceof Error) {
      throw new BadRequestException('User not found')
    }

    const token = await this.livekitService.addGrant(userId, room.name)

    const participant = await this.roomParticipantRepo.addParticipant({
      roomId: room.id,
      userId: user.id,
      token,
    })

    if (participant instanceof Error) {
      throw new BadRequestException('Error when adding a new participant to room')
    }

    return {
      id: participant.id,
      token: participant.token,
      name: user.address,
      roomId: room.id,
      userId: user.id,
    }
  }

  public async joinRoom(joinRoomRequest: IJoinRoomRequest): Promise<IRoomWithParticipantResponse> {
    const room = await this.roomRepo.getRoomById(joinRoomRequest.roomId)

    if (!room) {
      throw new NotFoundException('Room not found')
    }

    const user = await this.userService.getUserByAddress(joinRoomRequest.userAddress)

    if (user instanceof Error) {
      throw new BadRequestException('User not found')
    }

    const token = await this.livekitService.addGrant(user.id, room.name)

    const participant = await this.roomParticipantRepo.addParticipant({
      roomId: room.id,
      userId: user.id,
      token,
    })

    if (participant instanceof Error) {
      throw new BadRequestException('Error when adding a new participant to room')
    }

    return {
      room: {
        id: room.id,
        sid: room.sid,
        name: room.name,
      },
      participant: {
        id: participant.id,
        token: participant.token,
        name: user.address,
        roomId: participant.roomId,
        userId: participant.userId,
      },
    }
  }
}
