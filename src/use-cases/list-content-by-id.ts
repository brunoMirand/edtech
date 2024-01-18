import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { hasAlreadyBeenViewed } from '@/helpers/cookies-content-visited';

export class ListContentById {
  constructor(private contentRepository: ContentsRepository) { }

  async execute(id: string, contentViewed: string[]) {
    const content = await this.contentRepository.findById(id);
    if (!content) {
      return [];
    }

    if (!hasAlreadyBeenViewed(id, contentViewed)) {
      const views = content.views += 1;
      await this.contentRepository.incrementViews(id, views);
    }

    return content;
  }
}
