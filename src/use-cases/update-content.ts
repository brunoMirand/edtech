import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableUpdateContentError } from '@/use-cases/errors/contents-errors';
import { InputContent } from '@/domain/entities/content';
import { Logger } from '@/infra/logger/logger';

export class UpdateContent {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger
  ) {}

  async execute(id: string, input: InputContent) {
    try {
      const content = await this.contentRepository.update(id, input);
      this.logger.info('content updated', { extras: { id, input }});
      return content;
    } catch (e) {
      this.logger.error('unable update content', { extras: { error: e }});
      throw new UnableUpdateContentError();
    }
  }
}
