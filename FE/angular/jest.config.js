module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testRunner: 'jest-jasmine2',
  globalSetup: 'jest-preset-angular/global-setup',
  verbose: true
};
