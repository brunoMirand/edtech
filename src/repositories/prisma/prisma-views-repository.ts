import { prisma } from '@/infra/database/prisma';
import { ViewsRepository } from '@/repositories/interfaces/views-repository';

export class PrismaViewsRepository implements ViewsRepository {
  async save(contentId: string, userId: string) {
    await prisma.contentViewed.create({
      data: {
        content_id: contentId,
        user_id: userId,
      }
    });
  }

  async contentHasBeenViewed(contentId: string, userId: string) {
    const contentViewed = await prisma.contentViewed.findMany({
      where: {
        content_id: contentId,
        user_id: userId
      }
    });

    if (Array.isArray(contentViewed) && contentViewed.length === 0) {
      return false;
    }

    return true;
  }
}
