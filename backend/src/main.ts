import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureHttp } from './security/http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  configureHttp(app);
  await app.listen(3001);
}
bootstrap();
