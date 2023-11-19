import { Body, Controller, Get, Param, Post, Query, UseGuards, Request as DRequest } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'

import { IUserResponse } from '../response'
import { ICreateUserRequest } from '../request'
import { PaginationParamsQuery } from '../queries'
import { UserGuard, UserStrategyName } from '../guards'
import { Request } from 'express'

@ApiTags('User')
@ApiSecurity(UserStrategyName)
@UseGuards(UserGuard)
@Controller('/public/user')
export class UserController {
  constructor() {}

  @Get('/')
  @ApiOperation({ summary: 'Create or get user' })
  async getUser(@DRequest() req: Request): Promise<string | undefined> {
    return req.user?.userId
  }

  // @ApiOkResponse({
  //   type: IUserListResponse,
  // })
  // @ApiOperation({ summary: 'Get all users by user ID' })
  // @Get('/user/:id')
  // async getAllUsersByUserId(@Param('id') userId: number, @Query() pagitationParams: PaginationParamsQuery): Promise<IUserListResponse> {
  //   return this.userService.getAllUsersByUserId(userId, pagitationParams)
  // }

  // @Get('/:id')
  // @ApiOperation({ summary: 'Get user by ID' })
  // @ApiOkResponse({
  //   type: IUserResponse,
  // })
  // async getUserById(@Param('id') id: number): Promise<IUserResponse> {
  //   return this.userService.getUserById(id)
  // }

  // @Post('/send')
  // @ApiOperation({ summary: 'Send user to user address' })
  // @ApiOkResponse({
  //   type: IUserWithdrawalResponse,
  // })
  // async sendUser(@Body() sendUserRequest: ISendUserRequest): Promise<IUserWithdrawalResponse> {
  //   return this.userService.sendUser(sendUserRequest)
  // }
}
