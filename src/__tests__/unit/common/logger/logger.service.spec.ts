import { Logger, winstonLogger } from '@/common/logger';

jest.mock('../../../../common/logger/winston-logger', () => ({
  winstonLogger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

describe('LoggerService', () => {
  let service: Logger;

  beforeEach(() => {
    service = new Logger();
  });

  it('should log info', () => {
    service.log('test message', 'test context', 'test correlationId', 'test path');
    expect(winstonLogger.info).toHaveBeenCalledWith('test message', {
      context: 'test context',
      correlationId: 'test correlationId',
      path: 'test path'
    });
  });

  it('should log error', () => {
    service.error('test message', 'test trace', 'test context', 'test correlationId', 'test path');
    expect(winstonLogger.error).toHaveBeenCalledWith('test message', {
      context: 'test context',
      trace: 'test trace',
      correlationId: 'test correlationId',
      path: 'test path'
    });
  });

  it('should log warn', () => {
    service.warn('test message', 'test context');
    expect(winstonLogger.warn).toHaveBeenCalledWith('test message', { context: 'test context' });
  });

  it('should log debug', () => {
    service.debug('test message', 'test context');
    expect(winstonLogger.debug).toHaveBeenCalledWith('test message', { context: 'test context' });
  });
});
