export interface Logger {
  info(message: string, extra?: any): void;
  error(message: string, extra?: any): void;
}
