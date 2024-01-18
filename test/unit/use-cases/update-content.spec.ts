import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { UpdateContent } from '@/use-cases/update-content';
import { InputContent } from '@/domain/entities/content';

let contentRepository: InMemoryContentsRepository;
let sut: UpdateContent;

describe('Use Case - Create Content', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new UpdateContent(contentRepository);
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
