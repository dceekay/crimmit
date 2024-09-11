import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Owner } from './schemas/owner.schema';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() createOwnerDto: Partial<Owner>) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: Partial<Owner>) {
    return this.ownersService.update(id, updateOwnerDto);
  }
}
