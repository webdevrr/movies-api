import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { Env } from '@/common/env/env.schema';
import { EnvService } from '@/common/env/env.service';

describe('EnvService', () => {
  let envService: EnvService;
  let configService: ConfigService<Env, true>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    }).compile();

    envService = module.get<EnvService>(EnvService);
    configService = module.get<ConfigService<Env, true>>(ConfigService);
  });

  it('should be defined', () => {
    expect(envService).toBeDefined();
  });

  it('should return the correct value when get is called', () => {
    const key = 'PORT';
    const value = 'TEST_VALUE';
    jest.spyOn(configService, 'get').mockReturnValue(value);

    const result = envService.get(key);
    expect(result).toEqual(value);
    expect(configService.get).toHaveBeenCalledWith(key, { infer: true });
  });
});
