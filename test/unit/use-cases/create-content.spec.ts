import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { CreateContent } from '@/use-cases/create-content';
import { InputContent } from '@/domain/entities/content';
import { UnableCreateContentError } from '@/use-cases/errors/contents-errors';

let contentRepository: InMemoryContentsRepository;
let sut: CreateContent;

describe('Use Case - Create Content', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new CreateContent(contentRepository);
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
