export interface ContentsRepository {
  create(data: Input): Promise<Output>;
  update(id: string, data: Input): Promise<Output>;
  list(): Promise<Output[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Output | null | undefined>;
}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}

type Output = {
  id: string;
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
  created_at: Date;
  updated_at: Date;
}
