import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RepositoriesModule } from '../repositories'
import { UserController, RoomController } from './controllers'
import { RoomService, LivekitService, PrivyService, PushprotocolService, EvmService } from './services'
import { UserStrategy } from './guards'

@Module({
  imports: [ConfigModule, RepositoriesModule],
  controllers: [UserController, RoomController],
  providers: [UserStrategy, RoomService, LivekitService, PrivyService, PushprotocolService, EvmService],
})
export class PublicModule {}
