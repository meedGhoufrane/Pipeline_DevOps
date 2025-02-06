import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { Pharmacy } from './schemas/pharmacy.schema';

@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) { }

  @Post()
  async create(@Body() pharmacy: Partial<Pharmacy>): Promise<Pharmacy> {
    return this.pharmaciesService.create(pharmacy);
  }

  @Get()
  async findAll(): Promise<Pharmacy[]> {
    return this.pharmaciesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Pharmacy> {
    return this.pharmaciesService.findById(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      // Ensure proper ID conversion if using MongoDB
      return this.pharmaciesService.findById(id);
    } catch (error) {
      throw new NotFoundException(`Pharmacy with ID ${id} not found`);
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Pharmacy>): Promise<Pharmacy> {
    return this.pharmaciesService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Pharmacy> {
    return this.pharmaciesService.delete(id);
  }

  @Get('nearby')
  async findNearby(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('distance') distance: number,
  ): Promise<Pharmacy[]> {
    return this.pharmaciesService.findNearby(longitude, latitude, distance);
  }
}
