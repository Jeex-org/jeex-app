import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserModel } from 'src/models/user.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { PaginationParamsQuery } from 'src/modules/public/queries'
import { ICreateUserData } from './userRepo.interface'

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  public async createUser(createData: ICreateUserData): Promise<UserModel | Error> {
    try {
      const user = this.userRepo.create({ address: createData.address })
      await this.userRepo.save(user)
      return user
    } catch (err: any) {
      this.logger.error(`Error when creating a new user: ${err.message}`)
      return new Error(err.message)
    }
  }

  public async getUserById(id: number): Promise<UserModel | null> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['roomParticipant'],
      })
      return user
    } catch (err: any) {
      this.logger.error(`Error when retrieving user by ID: ${err.message}`)
      return null
    }
  }

  public async getUserByAddress(address: string): Promise<UserModel | null> {
    try {
      const user = await this.userRepo.findOne({
        where: { address },
      })
      return user
    } catch (err: any) {
      this.logger.error(`Error when retrieving user by ID: ${err.message}`)
      return null
    }
  }

  public async getAllUsers({ skip, take }: PaginationParamsQuery): Promise<{ users: UserModel[]; total: number }> {
    try {
      const [users, total] = await this.userRepo.findAndCount({
        skip,
        take,
        relations: ['roomParticipant'],
      })
      return { users, total }
    } catch (err: any) {
      this.logger.error(`Error when retrieving all users: ${err.message}`)
      return { users: [], total: 0 }
    }
  }
}
