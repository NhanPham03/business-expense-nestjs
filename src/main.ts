import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforms payloads into DTO.
    whitelist: true, // Disallows fields NOT included in the DTO.
    disableErrorMessages: false, // Change to TRUE when in PRODUCTION.
  }));

  await app.listen(port); // App should be running on 5050

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
