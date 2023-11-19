import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class ICreateUserRequest {
  @ApiProperty()
  @IsString()
  address!: string
}
