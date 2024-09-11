import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'owner',
      protoPath: join(__dirname, '../proto/owner.proto'),
      url: 'localhost:50051',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('OwnerService is running on http://localhost:3000');
}
bootstrap();
