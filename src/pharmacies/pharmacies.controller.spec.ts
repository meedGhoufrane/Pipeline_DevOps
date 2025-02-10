import { Test, TestingModule } from '@nestjs/testing';
import { PharmaciesController } from './pharmacies.controller';
import { PharmaciesService } from './pharmacies.service';
import { Pharmacy } from './schemas/pharmacy.schema';

describe('PharmaciesController', () => {
  let controller: PharmaciesController;
  let service: PharmaciesService;

  const mockPharmacy = {
    name: 'Test Pharmacy',
    address: '123 Test St',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    openingHours: '9 AM - 5 PM',
    contact: '123-456-7890',
    services: ['Prescription', 'Consultation'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmaciesController],
      providers: [
        {
          provide: PharmaciesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockPharmacy),
            findAll: jest.fn().mockResolvedValue([mockPharmacy]),
            findById: jest.fn().mockResolvedValue(mockPharmacy),
            update: jest.fn().mockResolvedValue(mockPharmacy),
            delete: jest.fn().mockResolvedValue(mockPharmacy),
            findNearby: jest.fn().mockResolvedValue([mockPharmacy]),
          },
        },
      ],
    }).compile();

    controller = module.get<PharmaciesController>(PharmaciesController);
    service = module.get<PharmaciesService>(PharmaciesService);
  });

  it('should create a pharmacy', async () => {
    const result = await controller.create(mockPharmacy);
    expect(result).toEqual(mockPharmacy);
    expect(service.create).toHaveBeenCalledWith(mockPharmacy);
  });

  it('should return all pharmacies', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockPharmacy]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a pharmacy by ID', async () => {
    const result = await controller.findById('1');
    expect(result).toEqual(mockPharmacy);
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should update a pharmacy', async () => {
    const result = await controller.update('1', { name: 'Updated Pharmacy' });
    expect(result).toEqual(mockPharmacy);
    expect(service.update).toHaveBeenCalledWith('1', { name: 'Updated Pharmacy' });
  });

  it('should delete a pharmacy', async () => {
    const result = await controller.delete('1');
    expect(result).toEqual(mockPharmacy);
    expect(service.delete).toHaveBeenCalledWith('1');
  });

  it('should find nearby pharmacies', async () => {
    const result = await controller.findNearby(0, 0, 1000);
    expect(result).toEqual([mockPharmacy]);
    expect(service.findNearby).toHaveBeenCalledWith(0, 0, 1000);
  });
}); 