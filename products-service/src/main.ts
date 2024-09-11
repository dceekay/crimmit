import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);  // Ensure this port doesn't conflict with other services
  console.log('ProductsService is running on http://localhost:3001');
}

bootstrap();
