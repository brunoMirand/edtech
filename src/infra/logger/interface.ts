export interface Logger {
  info(message: string, extras?: unknown): void;
  error(message: string, extras?: unknown): void;
}
