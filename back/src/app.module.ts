import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'

import { dataSourceOptions } from '../db/typeOrm.config'
import { PublicModule } from './modules/public'
import { RepositoriesModule } from './modules/repositories'

@Module({
  imports: [
    ConfigModule.forRoot({
      //настройка конфигурации из .env файла
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),
    WinstonModule.forRoot({
      level: process.env.LOG_LEVEL || 'debug',
      format: format.combine(
        format.colorize({ all: true }),
        format.simple(),
        format.printf((info) => {
          return `[${info.level}] ${info.message} ${info?.error?.stack || ''}`
        }),
      ),
      transports: [new transports.Console()],
    }),
    RepositoriesModule,
    PublicModule,
  ],
  providers: [],
})
export class AppModule {}
