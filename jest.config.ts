import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: [
    'src/repositories/',
    'src/env/',
    'src/use-cases/errors/',
    'src/infra/logger/'
  ],
  coverageReporters: ['cobertura', 'text', 'html'],
};

export default config;
