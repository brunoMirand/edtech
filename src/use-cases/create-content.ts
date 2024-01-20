import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { ContentAlreadyExistsError } from '@/use-cases/errors/content-already-exists-error';
export class CreateContent {
  constructor(private contentRepository: ContentsRepository) {}

  async execute(input: Input, role: string) {
    const existingContent = await this.contentRepository.findByName(input.name);
    if (existingContent) {
      throw new ContentAlreadyExistsError();
    }

    if (role !== 'admin') {
      throw new Error('User does not have permission for this feature.');
    }
    const content = await this.contentRepository.create(input);
    return content;
  }
}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}
