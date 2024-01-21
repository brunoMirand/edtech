import { randomUUID } from 'node:crypto';
import { ViewsRepository } from '@/repositories/interfaces/views-repository';

export class InMemoryViewsRepository implements ViewsRepository {
  private views: Map<string, Input> = new Map();

  async save(contentId: string, userId: string) {
    const contentViewed = {
      id: randomUUID(),
      content_id: contentId,
      user_id: userId,
    };

    this.views.set(contentViewed.id, contentViewed);
  }

  async contentHasBeenViewed(contentId: string, userId: string) {
    const contentViewed = Array.from(this.views.values());
    const viewed = contentViewed.find(content =>
      content.content_id === contentId && content.user_id === userId);

    return !!viewed;
  }
}

type Input = {
  content_id: string;
  user_id: string;
}
