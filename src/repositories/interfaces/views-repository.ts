export interface ViewsRepository {
  save(contentId: string, userId: string): Promise<void>;
  contentHasBeenViewed(contentId: string, userId: string): Promise<boolean>;
}
