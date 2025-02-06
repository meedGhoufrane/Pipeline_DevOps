import { Test, TestingModule } from '@nestjs/testing';
import { PharmaciesService } from './pharmacies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pharmacy } from './schemas/pharmacy.schema';

describe('PharmaciesService', () => {
  let service: PharmaciesService;
  let model: any;

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

  const mockPharmacyModel = {
    create: jest.fn().mockResolvedValue(mockPharmacy),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockPharmacy]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockPharmacy),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockPharmacy),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockPharmacy),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PharmaciesService,
        {
          provide: getModelToken(Pharmacy.name),
          useValue: mockPharmacyModel,
        },
      ],
    }).compile();

    service = module.get<PharmaciesService>(PharmaciesService);
    model = module.get(getModelToken(Pharmacy.name));
  });

  

  it('should return all pharmacies', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockPharmacy]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return a pharmacy by ID', async () => {
    const result = await service.findById('1');
    expect(result).toEqual(mockPharmacy);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('should update a pharmacy', async () => {
    const result = await service.update('1', { name: 'Updated Pharmacy' });
    expect(result).toEqual(mockPharmacy);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', { name: 'Updated Pharmacy' }, { new: true });
  });

  it('should delete a pharmacy', async () => {
    const result = await service.delete('1');
    expect(result).toEqual(mockPharmacy);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});