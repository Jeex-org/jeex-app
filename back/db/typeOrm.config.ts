import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

import { RoomModel, RoomParticipantModel, UserModel } from '../src/models'

config()

const configService = new ConfigService()

const url = configService.get('DB_URL')
const ca = configService.get('CA_CERT')

if (!url) {
  throw new Error('Not found env DB_URL')
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url,
  synchronize: true,
  logging: false,
  entities: [RoomModel, RoomParticipantModel, UserModel],
  migrations: [],
  ssl: ca ? { ca } : false,
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
