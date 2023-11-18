import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { UserRepositoryService } from 'src/modules/repositories'
import { ICreateUserRequest } from '../request'
import { IUserResponse } from '../response'

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly userRepo: UserRepositoryService,
  ) {}

  public async createUser(createUserRequest: ICreateUserRequest): Promise<IUserResponse> {
    const userExist = await this.userRepo.getUserByAddress(createUserRequest.address)

    if (userExist) {
      return {
        id: userExist.id,
        address: userExist.address,
      }
    }

    const user = await this.userRepo.createUser({ address: createUserRequest.address })

    if (user instanceof Error) {
      throw new BadRequestException('Error when creating a new user')
    }

    return {
      id: user.id,
      address: user.address,
    }
  }

  public async getUserById(id: number): Promise<IUserResponse> {
    const user = await this.userRepo.getUserById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return {
      id: user.id,
      address: user.address,
    }
  }

  public async getUserByAddress(address: string): Promise<IUserResponse> {
    const user = await this.userRepo.getUserByAddress(address)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return {
      id: user.id,
      address: user.address,
    }
  }
}
