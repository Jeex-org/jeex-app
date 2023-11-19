import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoomModel } from 'src/models/room.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { PaginationParamsQuery } from 'src/modules/public/queries'
import { ICreateRoomData } from './room.interface'

@Injectable()
export class RoomRepositoryService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @InjectRepository(RoomModel)
    private readonly roomRepo: Repository<RoomModel>,
  ) {}

  public async createRoom(createData: ICreateRoomData): Promise<RoomModel | Error> {
    try {
      const room = this.roomRepo.save({
        name: createData.name,
        sid: createData.sid,
        chatId: createData.chatId,
      })
      return room
    } catch (err: any) {
      this.logger.error(`Error when creating a new room: ${err.message}`)
      return new Error(err.message)
    }
  }

  public async getRoomById(id: number): Promise<RoomModel | null> {
    try {
      const room = await this.roomRepo.findOne({
        where: { id },
      })
      return room
    } catch (err: any) {
      this.logger.error(`Error when retrieving room by ID: ${err.message}`)
      return null
    }
  }

  public async getAllRooms({ skip, take }: PaginationParamsQuery): Promise<{ rooms: RoomModel[]; total: number }> {
    try {
      const [rooms, total] = await this.roomRepo.findAndCount({
        skip,
        take,
      })
      return { rooms, total }
    } catch (err: any) {
      this.logger.error(`Error when retrieving all rooms: ${err.message}`)
      return { rooms: [], total: 0 }
    }
  }

  public async getRoomsBy({ skip, take }: PaginationParamsQuery): Promise<{ rooms: RoomModel[]; total: number }> {
    try {
      const [rooms, total] = await this.roomRepo.findAndCount({
        skip,
        take,
      })
      return { rooms, total }
    } catch (err: any) {
      this.logger.error(`Error when retrieving all rooms: ${err.message}`)
      return { rooms: [], total: 0 }
    }
  }
}
