import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { AuthTokenClaims, PrivyClient, User } from '@privy-io/server-auth'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'winston'
import { Wallet, getDefaultProvider, ethers } from 'ethers'
import { CONSTANTS, GroupDTO, PushAPI } from '@pushprotocol/restapi'
import { contractABI } from '../constant'

@Injectable()
export class EvmService {
  private readonly provider: ethers.providers.BaseProvider
  private readonly contractAddress: string

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS')
    const rpcUrl = this.configService.get<string>('RPC_URL')

    if (!contractAddress || !rpcUrl) {
      throw new Error('CONTRACT_ADDRESS or RPC_URL is not defined')
    }

    this.contractAddress = contractAddress
    this.provider = getDefaultProvider(rpcUrl)
  }

  public async hasNft(address: string): Promise<boolean> {
    // Создание экземпляра контракта
    const contract = new ethers.Contract(this.contractAddress, contractABI, this.provider)

    try {
      // Предполагаем, что у контракта есть функция balanceOf, как в стандарте ERC-721
      const balance = await contract.balanceOf(address)

      // Проверка, есть ли у пользователя NFT
      const hasNFT = balance.gt(0)
      return true
    } catch (err: any) {
      console.log(`Error calling balanceOf: ${err}`)
      return false
    }
  }
}
