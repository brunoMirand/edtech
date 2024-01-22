import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableUpdateContentError } from '@/use-cases/errors/contents-errors';
import { InputContent } from '@/domain/entities/content';
import { Logger } from '@/infra/logger/interface';
import { Cache } from '@/infra/cache/interface';

export class UpdateContent {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger,
    private cache: Cache,
  ) {}

  async execute(id: string, input: InputContent) {
    try {
      const content = await this.contentRepository.update(id, input);
      this.logger.info('content updated', { extras: { id, input }});
      await this.cache.delete('contents:page:*');
      this.logger.info('content removed from cache');
      return content;
    } catch (e) {
      this.logger.error('unable update content', { extras: { error: e }});
      throw new UnableUpdateContentError();
    }
  }
}
