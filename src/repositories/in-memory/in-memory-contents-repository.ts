import { randomUUID } from 'node:crypto';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { Content, InputContent } from '@/domain/entities/content';
export class InMemoryContentsRepository implements ContentsRepository {
  private contents: Map<string, Content> = new Map();

  async create(data: InputContent) {
    const content = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      views: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.contents.set(content.id, content);
    return content;
  }

  async update(id: string, data: InputContent) {
    const content = {
      id,
      name: data.name,
      description: data.description,
      type: data.type,
      views: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.contents.set(id, content);
    return content;
  }

  async list(page: number = 0) {
    const itemsPerPage = 5;
    const contents = Array.from(this.contents.values());
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedContent = contents.slice(startIndex, endIndex)
      .map(content => {
        return {
          id: content.id,
          name: content.name
        };
      });
    return paginatedContent;
  }

  async delete(id: string) {
    this.contents.delete(id);
  }

  async findById(id: string) {
    return this.contents.get(id);
  }

  async incrementViews(id: string, views: number) {
    const content = this.contents.get(id) as Content;
    const payload = {
      ...content,
      views,
    };

    this.contents.set(id, payload);
  }

  async findByName(name: string) {
    const contents = Array.from(this.contents.values());

    const findContent = contents.find(content => content.name === name);
    return findContent;
  }
}
