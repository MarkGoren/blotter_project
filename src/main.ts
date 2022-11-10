import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3001',
  });
  // const configService = app.get(ConfigService);
  app.use(
    session({
      // secret: configService.get('SESSION_SECRET'),
      secret: 'SeCrEt',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000,
      },
    }),
    cookieParser(),
  );
  await app.listen(3000);
}
bootstrap();
