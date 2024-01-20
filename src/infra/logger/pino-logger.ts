import pino, { Logger as LoggerConfig } from 'pino';
import { Logger } from '@/infra/logger/logger';

export class PinoLogger implements Logger {
  private logger: LoggerConfig;

  constructor() {
    this.logger = pino({
      level: 'info',
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
      timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
    });
  }

  info(message: string, extras: unknown) {
    this.logger.info(extras, message);
  }
  error(message: string, extras: unknown) {
    this.logger.error(extras, message);
  }
}
