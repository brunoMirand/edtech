import { Logger } from '@/infra/logger/interface';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { ViewsRepository } from '@/repositories/interfaces/views-repository';

export class ListContentById {
  constructor(
    private contentRepository: ContentsRepository,
    private viewsRepository: ViewsRepository,
    private logger: Logger,
  ) { }

  async execute(id: string, userId: string, role: string) {
    const content = await this.contentRepository.findById(id);
    if (!content) {
      this.logger.info('content not found', { extras: id});
      return [];
    }

    const hasAlreadyBeenViewed = await this.viewsRepository.contentHasBeenViewed(id, userId);
    if (this.canIncreaseVisualization(hasAlreadyBeenViewed, role)) {
      this.logger.info('recording user view of content', { extras: { contentId: id, userId }});
      await this.viewsRepository.save(id, userId);
      const views = content.views += 1;
      await this.contentRepository.incrementViews(id, views);
    }

    this.logger.info('retrieved content', { extras: id});
    return content;
  }

  private canIncreaseVisualization(hasAlreadyBeenViewed: boolean, role: string): boolean {
    return !hasAlreadyBeenViewed && role === 'student';
  }
}
