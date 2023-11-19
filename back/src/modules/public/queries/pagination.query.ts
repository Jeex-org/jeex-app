import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PaginationParamsQuery {
  @ApiProperty({ required: false, description: 'Specifies the number of items to skip in a collection for pagination.' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip?: number

  @ApiProperty({ required: false, description: 'Specifies the maximum number of items to retrieve from a collection.' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take?: number
}
