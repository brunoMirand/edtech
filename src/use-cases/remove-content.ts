import { Logger } from '@/infra/logger/logger';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableRemoveContentError } from '@/use-cases/errors/contents-errors';

export class RemoveContent {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger
  ) { }

  async execute(id: string) {
    try {
      await this.contentRepository.delete(id);
      this.logger.info('content removed', { extras: id });
    } catch (e) {
      this.logger.error('unable to remove content.', { extras: { error: e }});
      throw new UnableRemoveContentError();
    }
  }
}
