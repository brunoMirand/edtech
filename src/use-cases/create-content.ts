import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { UnableCreateContentError } from '@/use-cases/errors/contents-errors';
import { InputContent } from '@/domain/entities/content';
import { Logger } from '@/infra/logger/logger';

export class CreateContent {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger,
  ) {}

  async execute(input: InputContent) {
    const existingContent = await this.contentRepository.findByName(input.name);
    if (existingContent) {
      this.logger.error('Content already to exists', { extras: input });
      throw new UnableCreateContentError();
    }

    const content = await this.contentRepository.create(input);
    this.logger.info('successful created content', { extras: content.id});
    return content;
  }
}
