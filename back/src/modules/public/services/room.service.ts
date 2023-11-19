import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'

import { ICreateRoomRequest, IJoinRoomRequest } from '../request'
import { IRoomListResponse, IRoomParticipantResponse, IRoomResponse, IRoomWithParticipantListResponse, IRoomWithParticipantResponse } from '../response'
import { LivekitService } from './livekit.service'
import { RoomParticipantRepositoryService, RoomRepositoryService } from 'src/modules/repositories'
import { PaginationParamsQuery } from '../queries'
import { PushprotocolService } from './pushprotocol.service'
import { EvmService } from './evm.service'
import { PrivyService } from './privy.service'

@Injectable()
export class RoomService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly livekitService: LivekitService,
    private readonly pushprotocolService: PushprotocolService,
    private readonly privyService: PrivyService,
    private readonly evmService: EvmService,
    private readonly roomRepo: RoomRepositoryService,
    private readonly roomParticipantRepo: RoomParticipantRepositoryService,
  ) {}

  public async createRoom(createRoomRequest: ICreateRoomRequest, userId: string): Promise<IRoomWithParticipantResponse> {
    const roomLivekit = await this.livekitService.createRoom({
      name: createRoomRequest.name,
    })

    if (roomLivekit instanceof Error) {
      throw new BadRequestException('Error when creating a new room in livekit')
    }

    const chat = await this.pushprotocolService.createChatRoom(createRoomRequest.name)

    if (chat instanceof Error) {
      throw new BadRequestException('Error when creating a new chat in pushprotocol')
    }

    const room = await this.roomRepo.createRoom({
      name: roomLivekit.name,
      sid: roomLivekit.sid,
      chatId: chat.chatId,
    })

    if (room instanceof Error) {
      throw new BadRequestException('Error when creating a new room in DB')
    }

    const participant = await this.addParticipantToRoom(room.id, userId)
    // Implement your logic here
    return {
      room: {
        id: room.id,
        sid: room.sid,
        name: room.name,
        chatId: room.chatId,
      },
      participant: {
        id: participant.id,
        token: participant.token,
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
        chatId: room.chatId,
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
      chatId: room.chatId,
    }
  }

  public async addParticipantToRoom(roomId: number, userId: string): Promise<IRoomParticipantResponse> {
    const room = await this.roomRepo.getRoomById(roomId)

    if (!room) {
      throw new NotFoundException('Room not found')
    }

    const token = await this.livekitService.addGrant(userId, room.name)

    const participant = await this.roomParticipantRepo.addParticipant({
      roomId: room.id,
      userId,
      token,
    })

    if (participant instanceof Error) {
      throw new BadRequestException('Error when adding a new participant to room')
    }

    return {
      userId,
      id: participant.id,
      token: participant.token,
      roomId: room.id,
    }
  }

  public async joinRoom(joinRoomRequest: IJoinRoomRequest, userId: string): Promise<IRoomWithParticipantResponse> {
    const user = await this.privyService.getUserById(userId)

    if (user instanceof Error) {
      throw new BadRequestException('Error when getting user from privy')
    }

    const hasNFT = await this.evmService.hasNft(user.wallet!.address)

    if (!hasNFT) {
      throw new BadRequestException('User has no NFT')
    }

    const room = await this.roomRepo.getRoomById(joinRoomRequest.roomId)

    if (!room) {
      throw new NotFoundException('Room not found')
    }

    const addToChatErr = await this.pushprotocolService.addUserToChatRoom(room.chatId, user.wallet!.address)

    if (addToChatErr instanceof Error) {
      throw new BadRequestException('Error when adding user to chat')
    }

    const token = await this.livekitService.addGrant(userId, room.name)

    const participant = await this.roomParticipantRepo.addParticipant({
      roomId: room.id,
      userId,
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
        chatId: room.chatId,
      },
      participant: {
        id: participant.id,
        token: participant.token,
        roomId: participant.roomId,
        userId: participant.userId,
      },
    }
  }

  public async getRoomParticipantsByUserId(userId: string): Promise<IRoomWithParticipantListResponse> {
    const participants = await this.roomParticipantRepo.getParticipantsByUserId(userId)

    if (!participants) {
      throw new NotFoundException('Participants not found')
    }

    const rooms = await Promise.all(
      participants.map(async (participant) => {
        const room = await this.roomRepo.getRoomById(participant.roomId)

        if (!room) {
          throw new NotFoundException('Room not found')
        }

        return {
          id: room.id,
          sid: room.sid,
          name: room.name,
          chatId: room.chatId,
        }
      }),
    )

    return {
      rooms: rooms.map((room, index) => ({
        room,
        participant: {
          id: participants[index].id,
          token: participants[index].token,
          roomId: participants[index].roomId,
          userId: participants[index].userId,
        },
      })),
      total: rooms.length,
    }
  }
}
