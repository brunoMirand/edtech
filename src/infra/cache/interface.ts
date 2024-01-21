export interface Cache {
  set(key: string, data: string): Promise<unknown>;
  get(key: string): Promise<unknown>;
  delete(key: string): Promise<unknown>;
}
