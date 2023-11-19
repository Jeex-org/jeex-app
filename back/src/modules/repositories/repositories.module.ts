import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoomRepositoryService } from './room'
import { RoomParticipantRepositoryService } from './roomParticipant'
import { RoomModel, RoomParticipantModel } from '../../models'

@Module({
  imports: [TypeOrmModule.forFeature([RoomModel, RoomParticipantModel])],
  providers: [RoomRepositoryService, RoomParticipantRepositoryService],
  exports: [RoomRepositoryService, RoomParticipantRepositoryService],
})
export class RepositoriesModule {}
