export interface Logger {
  info(message: string, extras?: any): void;
  error(message: string, extras?: any): void;
}
