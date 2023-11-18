import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { RoomService } from '../services/room.service'
import { IRoomResponse, IRoomListResponse, IRoomWithParticipantResponse } from '../response'
import { ICreateRoomRequest, IJoinRoomRequest } from '../request'
import { PaginationParamsQuery } from '../queries'

@ApiTags('Room')
@Controller('/public/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new room' })
  @ApiOkResponse({
    type: IRoomResponse,
  })
  async createRoom(@Body() createRoomRequest: ICreateRoomRequest): Promise<IRoomWithParticipantResponse> {
    return this.roomService.createRoom(createRoomRequest)
  }

  @Post('/join')
  @ApiOperation({ summary: 'Join room' })
  @ApiOkResponse({
    type: IRoomResponse,
  })
  async joinRoom(@Body() joinRoomRequest: IJoinRoomRequest): Promise<IRoomWithParticipantResponse> {
    return this.roomService.joinRoom(joinRoomRequest)
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiOkResponse({
    type: IRoomListResponse,
  })
  async getAllRooms(@Query() paginationParams: PaginationParamsQuery): Promise<IRoomListResponse> {
    return this.roomService.getAllRooms(paginationParams)
  }
}
