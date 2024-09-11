import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner, OwnerDocument } from './schemas/owner.schema';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
    @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
  ) {}

  async create(createOwnerDto: Partial<Owner>): Promise<Owner> {
    const createdOwner = new this.ownerModel(createOwnerDto);
    return createdOwner.save();
  }

  async update(id: string, updateOwnerDto: Partial<Owner>): Promise<Owner> {
    const updatedOwner = await this.ownerModel.findByIdAndUpdate(id, updateOwnerDto, { new: true });
    this.productsClient.emit('owner_updated', { ownerId: id, ...updateOwnerDto });
    return updatedOwner;
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerModel.find().exec();
  }

  async findOne(id: string): Promise<Owner> {
    return this.ownerModel.findById(id).exec();
  }
}
