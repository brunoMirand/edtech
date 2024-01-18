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

  async list() {
    const contents = Array.from(this.contents.values());
    return contents;
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
}
