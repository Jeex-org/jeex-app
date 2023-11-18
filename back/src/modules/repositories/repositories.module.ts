import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoomRepositoryService } from './room'
import { UserRepositoryService } from './user'
import { RoomParticipantRepositoryService } from './roomParticipant'
import { RoomModel, RoomParticipantModel, UserModel } from '../../models'

@Module({
  imports: [TypeOrmModule.forFeature([RoomModel, RoomParticipantModel, UserModel])],
  providers: [RoomRepositoryService, RoomParticipantRepositoryService, UserRepositoryService],
  exports: [RoomRepositoryService, RoomParticipantRepositoryService, UserRepositoryService],
})
export class RepositoriesModule {}
