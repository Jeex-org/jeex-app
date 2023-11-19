import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { Strategy } from 'passport-strategy'
import { Request } from 'express'
import { PrivyService } from '../services'

export const UserStrategyName = 'Authorization'

// "мидлвара"  для авторизации
@Injectable()
export class UserGuard extends AuthGuard(UserStrategyName) {}

//стратегия для авторизации по токену
@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, UserStrategyName) {
  constructor(private readonly privyService: PrivyService) {
    super()
  }

  async authenticate(req: Request, options?: any) {
    const token = req.headers.authorization

    if (!token) {
      this.error(new UnauthorizedException('Header authorization is missing'))
      return
    }

    const authTokenClaims = await this.privyService.verifiedClaims(token)

    if (authTokenClaims instanceof Error) {
      this.error(new UnauthorizedException(authTokenClaims.message))
      return
    }

    console.log(authTokenClaims)

    req.user = {
      userId: authTokenClaims.userId,
    }

    this.success({ ...req.user })
  }
}
