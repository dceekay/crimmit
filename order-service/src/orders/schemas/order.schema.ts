import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, unique: true })
  orderId: string;

  @Prop({ type: [String], required: true })
  productIds: string[];

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;

  // Add more fields as necessary
}

export const OrderSchema = SchemaFactory.createForClass(Order);
