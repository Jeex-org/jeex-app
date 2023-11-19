import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { AuthTokenClaims, PrivyClient, User } from '@privy-io/server-auth'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { Wallet, getDefaultProvider } from 'ethers'
import { CONSTANTS, PushAPI } from '@pushprotocol/restapi'

@Injectable()
export class PrivyService {
  private readonly client: PrivyClient

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const appId = this.configService.get<string>('PRIVY_APP_ID')
    const apiSecret = this.configService.get<string>('PRIVY_APP_SECRET')

    if (!appId || !apiSecret) {
      throw new Error('Not found PRIVY_API_ID or PRIVY_API_SECRET')
    }

    const client = new PrivyClient(appId, apiSecret)
    this.client = client
  }

  public async verifiedClaims(authToken: string): Promise<AuthTokenClaims | Error> {
    try {
      const verifiedClaims = await this.client.verifyAuthToken(authToken)
      return verifiedClaims
    } catch (err: any) {
      console.log(`Token verification failed with error ${err}.`)
      return new Error(`Token verification failed with error ${err}.`)
    }
  }

  public async getUserById(userId: string): Promise<User | Error> {
    try {
      const user = await this.client.getUser(userId)

      return user
    } catch (err: any) {
      console.log(`Token verification failed with error ${err}.`)
      return new Error(`Token verification failed with error ${err}.`)
    }
  }
}
