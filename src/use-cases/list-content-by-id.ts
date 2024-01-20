import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { ViewsRepository } from '@/repositories/interfaces/views-repository';

export class ListContentById {
  constructor(
    private contentRepository: ContentsRepository,
    private viewsRepository: ViewsRepository,
  ) { }

  async execute(id: string, userId: string) {
    const content = await this.contentRepository.findById(id);
    if (!content) {
      return [];
    }

    const hasAlreadyBeenViewed = await this.viewsRepository.contentHasBeenViewed(id, userId);
    if (!hasAlreadyBeenViewed) {
      await this.viewsRepository.save(id, userId);
      const views = content.views += 1;
      await this.contentRepository.incrementViews(id, views);
    }

    return content;
  }
}
