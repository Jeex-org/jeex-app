import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { UserStrategyName } from './modules/public/guards'

const PORT = process.env['PORT'] ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('JEEX API')
    .setDescription('API documentation for JEEX')
    .setVersion('0.1')
    .addApiKey(
      {
        description: `Please enter user jwt token`,
        name: UserStrategyName,
        type: 'apiKey',
        in: 'header',
      },
      UserStrategyName,
    )
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('/doc', app, document)

  await app.listen(PORT)
}
bootstrap()
