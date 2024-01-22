import { Cache } from '@/infra/cache/interface';
import { Logger } from '@/infra/logger/interface';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableRemoveContentError } from '@/use-cases/errors/contents-errors';

export class RemoveContent {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger,
    private cache: Cache,
  ) { }

  async execute(id: string) {
    try {
      await this.contentRepository.delete(id);
      this.logger.info('content removed', { extras: id });
      await this.cache.delete('contents:page:*');
      this.logger.info('content removed from cache');
    } catch (e) {
      this.logger.error('unable to remove content.', { extras: { error: e }});
      throw new UnableRemoveContentError();
    }
  }
}
