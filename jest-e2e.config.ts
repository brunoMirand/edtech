import jestConfig from './jest.config';

export default {
  ...jestConfig,
  testEnvironment: './src/infra/database/prisma/prima-test-environment.ts',
  testRegex: '.e2e.spec.ts$',
};
