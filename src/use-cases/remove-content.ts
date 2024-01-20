import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableRemoveContentError } from '@/use-cases/errors/contents-errors';

export class RemoveContent {
  constructor(private contentRepository: ContentsRepository) { }

  async execute(id: string) {
    try {
      await this.contentRepository.delete(id);
    } catch (e) {
      throw new UnableRemoveContentError();
    }
  }
}
