import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class ICreateRoomRequest {
  @ApiProperty()
  @IsString()
  name!: string

  @ApiProperty()
  @IsString()
  userAddress!: string
}

export class IJoinRoomRequest {
  @ApiProperty()
  @IsNumber()
  roomId!: number

  @ApiProperty()
  @IsString()
  userAddress!: string
}
