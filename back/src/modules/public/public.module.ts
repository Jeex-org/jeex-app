import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RepositoriesModule } from '../repositories'
import { UserController, RoomController } from './controllers'
import { RoomService, UserService, LivekitService } from './services'

@Module({
  imports: [ConfigModule, RepositoriesModule],
  controllers: [UserController, RoomController],
  providers: [RoomService, UserService, LivekitService],
})
export class PublicModule {}
