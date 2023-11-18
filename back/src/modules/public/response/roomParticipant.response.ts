import { ApiProperty } from '@nestjs/swagger'

export class IRoomParticipantResponse {
  @ApiProperty({ description: 'Id in database' })
  id!: number

  @ApiProperty({ description: 'Access token user from livekit' })
  token!: string

  @ApiProperty({ description: 'name' })
  name!: string

  @ApiProperty({ description: 'token' })
  roomId!: number

  @ApiProperty({ description: 'user_id' })
  userId!: number
}
