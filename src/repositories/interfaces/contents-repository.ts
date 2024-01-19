import { Content, InputContent } from '@/domain/entities/content';

export interface ContentsRepository {
  create(data: InputContent): Promise<Content>;
  update(id: string, data: InputContent): Promise<Content>;
  list(offset: number, limit: number): Promise<Content[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Content | null | undefined>;
  incrementViews(id: string, views: number): Promise<void>;
}
