import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableCreateContentError } from '@/use-cases/errors/contents-errors';
import { InputContent } from '@/domain/entities/content';

export class CreateContent {
  constructor(private contentRepository: ContentsRepository) {}

  async execute(input: InputContent, role: string) {
    const existingContent = await this.contentRepository.findByName(input.name);
    if (existingContent) {
      throw new UnableCreateContentError();
    }

    if (role !== 'admin') {
      throw new Error('User does not have permission for this feature.');
    }
    const content = await this.contentRepository.create(input);
    return content;
  }
}
