import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { ListContents } from '@/use-cases/list-contents';
import { InputContent } from '@/domain/entities/content';
import { PinoLogger } from '@/infra/logger/pino-logger';


jest.mock('@/infra/logger/pino-logger', () => ({
  PinoLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
  })),
}));


describe('Use Case - List Contents', () => {
  let contentRepository: InMemoryContentsRepository;
  let sut: ListContents;
  let logger: PinoLogger;

  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    logger = new PinoLogger();
    sut = new ListContents(contentRepository, logger);
  });

  it('should return all contents', async () => {
    //give
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };
    const offset = 0;
    const limit = 5;
    await contentRepository.create(inputContent);

    //when
    const response = await sut.execute(offset, limit);

    //then
    expect(response).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Comunicação Assíncrona',
        description: 'Aprenda como se comunicar em ambientes remotos',
        type: 'pdf',
        created_at: expect.any(Date)
      })
    ]));
  });
});
