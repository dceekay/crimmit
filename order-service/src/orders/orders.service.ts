import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectRedis } from '@nestjs-modules/ioredis';  
import Redis from 'ioredis';  
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectRedis() private readonly redis: Redis,  

  async create(createOrderDto: Partial<Order>): Promise<Order> {
    // Automatically generate orderId using UUID
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      orderId: uuidv4(),  // Generate unique orderId
    });
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: Partial<Order>): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
    
    await this.updateCache(updatedOrder.productIds);
    return updatedOrder;
  }

  async getCachedProduct(productId: string): Promise<any> {
    const cachedProduct = await this.redis.get(`product:${productId}`);
    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    }
    return null;
  }

  async setCachedProduct(productId: string, productData: any): Promise<void> {
    await this.redis.set(`product:${productId}`, JSON.stringify(productData), 'EX', 3600);  // Cache for 1 hour
  }

  async updateCache(productIds: string[]) {
    
    productIds.forEach(async (productId) => {
      await this.redis.del(`product:${productId}`);
    });
  }
}
