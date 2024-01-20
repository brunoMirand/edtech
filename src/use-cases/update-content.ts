import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableUpdateContentError } from '@/use-cases/errors/contents-errors';
import { InputContent } from '@/domain/entities/content';

export class UpdateContent {
  constructor(private contentRepository: ContentsRepository) {}

  async execute(id: string, input: InputContent) {
    try {
      const content = await this.contentRepository.update(id, input);
      return content;
    } catch (e) {
      throw new UnableUpdateContentError();
    }

  }
}
