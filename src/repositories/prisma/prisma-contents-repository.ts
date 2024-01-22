import { prisma } from '@/infra/database/prisma';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { InputContent } from '@/domain/entities/content';

export class PrismaContentsRepository implements ContentsRepository {
  async create(data: InputContent) {
    const content = await prisma.content.create({
      data,
    });

    return content;
  }

  async update(id: string, data: InputContent) {
    const content = await prisma.content.update({
      where: {
        id
      },
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
      }
    });

    return content;
  }

  async list(page: number = 0) {
    const itemsPerPage = 5;
    const skip = (page - 1) * itemsPerPage;
    const contents = await prisma.content.findMany({
      select: {
        id: true,
        name: true,
      },
      skip: skip,
      take: itemsPerPage,
      orderBy: [{
        updated_at: 'desc',
      },
      {
        created_at: 'desc',
      }
      ],
    });

    return contents;
  }

  async delete (id: string) {
  await prisma.content.delete({
    where: {
      id,
    },
  });
}

  async findById(id: string) {
  const content = await prisma.content.findUnique({
    where: {
      id
    },
  });

  return content;
}

  async incrementViews(id: string, views: number) {
  await prisma.content.update({
    where: {
      id
    },
    data: {
      views
    }
  });
}

  async findByName(name: string) {
  const content = prisma.content.findUnique({
    where: {
      name,
    },
  });

  return content;
}
}
