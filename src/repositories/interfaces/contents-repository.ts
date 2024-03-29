import { Content, InputContent } from '@/domain/entities/content';

export interface ContentsRepository {
  create(data: InputContent): Promise<Content>;
  update(id: string, data: InputContent): Promise<Content>;
  list(page: number): Promise<{ id: string, name: string }[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Content | null | undefined>;
  incrementViews(id: string, views: number): Promise<void>;
  findByName(name: string): Promise<Content | null | undefined>;
}
