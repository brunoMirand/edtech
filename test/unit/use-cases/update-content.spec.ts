import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { UpdateContent } from '@/use-cases/update-content';
import { InputContent } from '@/domain/entities/content';
import { PinoLogger } from '@/infra/logger/pino-logger';


jest.mock('@/infra/logger/pino-logger', () => ({
  PinoLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
  })),
}));

describe('Use Case - Create Content', () => {

  let contentRepository: InMemoryContentsRepository;
  let sut: UpdateContent;
  let logger: PinoLogger;

  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    logger = new PinoLogger;
    sut = new UpdateContent(contentRepository, logger);
  });

  it('should return success when create content', async () => {
    //given
    const content: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const contentCreated = await contentRepository.create(content);

    const newContent: InputContent = {
      name: 'Ser ou não ser',
      description: 'aprenda com os melhores',
      type: 'video',
    };

    //when
    const response = await sut.execute(contentCreated.id, newContent);
    //then
    expect(response.name).toBe('Ser ou não ser');
  });
});
