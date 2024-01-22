import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { RemoveContent } from '@/use-cases/remove-content';
import { InputContent } from '@/domain/entities/content';
import { PinoLogger } from '@/infra/logger/pino-logger';
import { RedisCache } from '@/infra/cache/redis';

jest.mock('@/infra/logger/pino-logger');
jest.mock('@/infra/cache/redis');

describe('Use Case - Remove Content', () => {
  let contentRepository: InMemoryContentsRepository;
  let logger: jest.Mocked<PinoLogger>;
  let cache: jest.Mocked<RedisCache>;
  let sut: RemoveContent;

  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    logger = new PinoLogger() as jest.Mocked<PinoLogger>;
    cache = new RedisCache() as jest.Mocked<RedisCache>;
    sut = new RemoveContent(contentRepository, logger, cache);
  });

  it('should remove content with success', async () => {
    //given
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const content = await contentRepository.create(inputContent);
    expect(content).toBeDefined();

    //when//then
    expect(await sut.execute(content.id)).toBe(void 0);
  });
});
