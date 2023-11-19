import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class ICreateRoomRequest {
  @ApiProperty()
  @IsString()
  name!: string
}

export class IJoinRoomRequest {
  @ApiProperty()
  @IsNumber()
  roomId!: number
}
