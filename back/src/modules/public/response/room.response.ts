import { ApiProperty } from '@nestjs/swagger'
import { IRoomParticipantResponse } from './roomParticipant.response'

export class IRoomResponse {
  @ApiProperty({ description: 'Id in database' })
  id!: number

  @ApiProperty({ description: 'Id livekit room' })
  sid!: string

  @ApiProperty({ description: 'Chat id from push protocol' })
  chatId!: string

  @ApiProperty({ description: 'name' })
  name!: string
}

export class IRoomWithParticipantResponse {
  @ApiProperty({ type: IRoomResponse })
  room!: IRoomResponse

  @ApiProperty({ type: IRoomParticipantResponse })
  participant!: IRoomParticipantResponse
}

export class IRoomListResponse {
  @ApiProperty({ type: IRoomResponse, isArray: true })
  rooms!: IRoomResponse[]

  @ApiProperty()
  total!: number
}

export class IRoomWithParticipantListResponse {
  @ApiProperty({ type: IRoomWithParticipantResponse, isArray: true })
  rooms!: IRoomWithParticipantResponse[]

  @ApiProperty()
  total!: number
}
