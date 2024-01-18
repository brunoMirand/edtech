import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { UpdateContent } from '@/use-cases/update-content';

let contentRepository: InMemoryContentsRepository;
let sut: UpdateContent;
type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
};

describe('Use Case - Create Content', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new UpdateContent(contentRepository);
  });

  it('should return success when create content', async () => {
    //given
    const content: Input = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const contentCreated = await contentRepository.create(content);

    const newContent: Input = {
      name: 'Ser ou não ser',
      description: 'aprenda com os melhores',
      type: 'video',
    };

    //when
    const response = await sut.execute(contentCreated.id, newContent);
    //then
    expect(response.name).toBe('Ser ou não ser');
  });

  // it('should return an exception when trying to create content with a non-admin user', async () => {
  //   //given
  //   const inputContent: Input = {
  //     name: 'Comunicação Assíncrona',
  //     description: 'Aprenda como se comunicar em ambientes remotos',
  //     type: 'pdf',
  //   };

  //   const role = 'user';
  //   //when//then
  //   await expect(() => sut.execute(inputContent, role)).rejects.toThrow(new Error('User does not have permission for this feature.'));
  // });
});
