import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { ListContents } from '@/use-cases/list-contents';
import { InputContent } from '@/domain/entities/content';
import { PinoLogger } from '@/infra/logger/pino-logger';
import { RedisCache } from '@/infra/cache/redis';

jest.mock('@/infra/logger/pino-logger');
jest.mock('@/infra/cache/redis');

describe('Use Case - List Contents', () => {
  let contentRepository: InMemoryContentsRepository;
  let logger: jest.Mocked<PinoLogger>;
  let cache: jest.Mocked<RedisCache>;
  let sut: ListContents;

  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    logger = new PinoLogger() as jest.Mocked<PinoLogger>;
    cache = new RedisCache() as jest.Mocked<RedisCache>;
    sut = new ListContents(contentRepository, logger, cache);
  });

  it('should return all contents', async () => {
    //give
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };
    const page = 1;
    await contentRepository.create(inputContent);
    cache.get.mockResolvedValue(null);

    //when
    const response = await sut.execute(page);

    //then
    expect(logger.info).toHaveBeenCalledTimes(2);
    expect(response).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Comunicação Assíncrona',
      })
    ]));
  });

  it('should return all contents from cache', async () => {
    //give
    const page = 1;
    cache.get.mockResolvedValue(JSON.stringify([{
      id: 'fake-id',
      name: 'Comunicação Assíncrona',
    }]));


    //when
    const response = await sut.execute(page);

    //then
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(response).toEqual([{
      id: 'fake-id',
      name: 'Comunicação Assíncrona',
    }]);
  });
});
