import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { AuthTokenClaims, PrivyClient, User } from '@privy-io/server-auth'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { Wallet, getDefaultProvider } from 'ethers'
import { CONSTANTS, GroupDTO, PushAPI } from '@pushprotocol/restapi'

@Injectable()
export class PushprotocolService {
  private readonly wallet: Wallet

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const privateKey = this.configService.get<string>('PUSH_PROTOCOL_PRIVATE_KEY')

    if (!privateKey) {
      throw new Error('env PUSH_PROTOCOL_PRIVATE_KEY not found')
    }

    this.wallet = new Wallet(privateKey)
  }

  public async createChatRoom(name: string): Promise<GroupDTO | Error> {
    try {
      const pushUser = await PushAPI.initialize(this.wallet, { env: CONSTANTS.ENV.STAGING })

      const createdGroup = await pushUser.chat.group.create('test room', {
        image:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==',
      })

      return createdGroup
    } catch (err: any) {
      console.log(`Token verification failed with error ${err}.`)
      return new Error(`Token verification failed with error ${err}.`)
    }
  }

  public async addUserToChatRoom(chatId: string, address: string): Promise<GroupDTO | Error> {
    try {
      const pushUser = await PushAPI.initialize(this.wallet, { env: CONSTANTS.ENV.STAGING })

      const group = await pushUser.chat.group.add(chatId, {
        accounts: [address],
        role: 'MEMBER',
      })

      return group
    } catch (err: any) {
      console.log(`Token verification failed with error ${err}.`)
      return new Error(`Token verification failed with error ${err}.`)
    }
  }
}
