import { Body, Controller, Get, Post, Query, Request as DRequest, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'

import { RoomService } from '../services/room.service'
import { IRoomResponse, IRoomListResponse, IRoomWithParticipantResponse, IRoomWithParticipantListResponse } from '../response'
import { ICreateRoomRequest, IJoinRoomRequest } from '../request'
import { PaginationParamsQuery } from '../queries'
import { Request } from 'express'
import { UserGuard, UserStrategyName } from '../guards'

@ApiTags('Room')
@ApiSecurity(UserStrategyName)
@UseGuards(UserGuard)
@Controller('/public/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new room' })
  @ApiOkResponse({
    type: IRoomResponse,
  })
  async createRoom(@Body() createRoomRequest: ICreateRoomRequest, @DRequest() req: Request): Promise<IRoomWithParticipantResponse> {
    return this.roomService.createRoom(createRoomRequest, req.user!.userId)
  }

  @Post('/join')
  @ApiOperation({ summary: 'Join room' })
  @ApiOkResponse({
    type: IRoomResponse,
  })
  async joinRoom(@Body() joinRoomRequest: IJoinRoomRequest, @DRequest() req: Request): Promise<IRoomWithParticipantResponse> {
    return this.roomService.joinRoom(joinRoomRequest, req.user!.userId)
  }

  @Get('/user')
  @ApiOperation({ summary: 'Get all rooms by user' })
  @ApiOkResponse({
    type: IRoomListResponse,
  })
  async getAllRoomsByUser(@DRequest() req: Request): Promise<IRoomWithParticipantListResponse> {
    return this.roomService.getRoomParticipantsByUserId(req.user!.userId)
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
