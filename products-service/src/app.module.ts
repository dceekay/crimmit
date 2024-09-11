import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products/products.module';  // Import ProductsModule
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/crimmit'),
    ProductsModule,  // Register ProductsModule
    ClientsModule.register([
      {
        name: 'OWNER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'owner',
          protoPath: join(__dirname, '../proto/owner.proto'),  // Ensure this path points to the correct .proto file
        },
      },
    ]),
  ],
})
export class AppModule {}
