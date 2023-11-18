import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { UserService } from '../services'
import { IUserResponse } from '../response'
import { ICreateUserRequest } from '../request'
import { PaginationParamsQuery } from '../queries'

@ApiTags('User')
@Controller('/public/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create or get user' })
  @ApiOkResponse({
    type: IUserResponse,
  })
  async createUser(@Body() createUserRequest: ICreateUserRequest): Promise<IUserResponse> {
    return this.userService.createUser(createUserRequest)
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
