import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const PORT = process.env['PORT'] ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const config = new DocumentBuilder().setTitle('NFMUSIC AM').setDescription('API documentation for asset manager').setVersion('1.0').build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/doc', app, document)

  await app.listen(PORT)
}
bootstrap()
