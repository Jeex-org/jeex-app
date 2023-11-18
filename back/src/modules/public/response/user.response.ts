import { ApiProperty } from '@nestjs/swagger'

export class IUserResponse {
  @ApiProperty({ description: 'Id in database' })
  id!: number

  @ApiProperty({ description: 'Address evm' })
  address!: string
}
