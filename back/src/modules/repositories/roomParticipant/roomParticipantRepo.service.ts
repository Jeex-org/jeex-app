import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoomParticipantModel } from 'src/models/roomParticipant.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ICreateParticipantRoomData } from './roomParticipantRepo.interface'

@Injectable()
export class RoomParticipantRepositoryService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @InjectRepository(RoomParticipantModel)
    private readonly roomParticipantRepo: Repository<RoomParticipantModel>,
  ) {}

  public async addParticipant(createData: ICreateParticipantRoomData): Promise<RoomParticipantModel | Error> {
    try {
      const participant = await this.roomParticipantRepo.save({ userId: createData.userId, roomId: createData.roomId, token: createData.token })
      return participant
    } catch (err: any) {
      this.logger.error(`Error when adding a new participant: ${err.message}`)
      return new Error(err.message)
    }
  }

  public async getParticipantsByRoomId(roomId: number): Promise<RoomParticipantModel[] | null> {
    try {
      const participants = await this.roomParticipantRepo.find({
        where: { roomId },
        relations: ['user', 'room'],
      })
      return participants
    } catch (err: any) {
      this.logger.error(`Error when retrieving participants by room ID: ${err.message}`)
      return null
    }
  }

  public async getParticipantsByUserId(userId: string): Promise<RoomParticipantModel[] | null> {
    try {
      const participants = await this.roomParticipantRepo.find({
        where: { userId },
        relations: ['room'],
      })
      return participants
    } catch (err: any) {
      this.logger.error(`Error when retrieving participants by user ID: ${err.message}`)
      return null
    }
  }

  public async getParticipantByUserIdAndRoomId(userId: string, roomId: number): Promise<RoomParticipantModel | null> {
    try {
      const participant = await this.roomParticipantRepo.findOne({
        where: { userId, roomId },
        relations: ['room'],
      })

      return participant
    } catch (err: any) {
      this.logger.error(`Error when retrieving participant by user ID and room ID: ${err.message}`)
      return null
    }
  }
}
