import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MongooseModule } from '@nestjs/mongoose';  // Import MongooseModule
import { OrdersModule } from './orders/orders.module';  // Import OrdersModule

@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot('mongodb://localhost:27017/crimmit'),  // Adjust the MongoDB connection string if needed
    
    // Import OrdersModule
    OrdersModule,

    // gRPC
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '../proto/product.proto'),
        },
      },
    ]),

    // Redis 
    RedisModule.forRoot({
      type: 'single',  
      url: 'redis://localhost:6379', 
    }),
  ],
})
export class AppModule {}
