import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { CreateContent } from '@/use-cases/create-content';
import { InputContent } from '@/domain/entities/content';
import { UnableCreateContentError } from '@/use-cases/errors/contents-errors';
import { PinoLogger } from '@/infra/logger/pino-logger';

jest.mock('@/infra/logger/pino-logger', () => ({
  PinoLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
  })),
}));

describe('Use Case - Create Content', () => {

  let contentRepository: InMemoryContentsRepository;
  let logger: PinoLogger;
  let sut: CreateContent;


  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    logger = new PinoLogger();
    sut = new CreateContent(contentRepository, logger);
  });

  it('should return success when create content', async () => {
    //given
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };
    //when
    const response = await sut.execute(inputContent);
    //then
    expect(response.name).toBe('Comunicação Assíncrona');
  });

  it('should return an exception when trying to create content already exists', async () => {
    //given
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    //when
    await sut.execute(inputContent);

    //when//then
    await expect(() => sut.execute(inputContent)).rejects.toThrow(new UnableCreateContentError());
  });
});
