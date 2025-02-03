import { defineConfig, devices } from '@playwright/test';
import { config } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e/tests/ui',
  /* Run tests in files in parallel */
  fullyParallel: false,
  timeout:50000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
    // Two retries for each test
  //retries: 1,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['html', { open: 'never' }],['allure-playwright'] ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'on',
    video:'retain-on-failure',
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
      use: {
        video: "off",
        // headless: false,
      },
    },

    {
      name: 'chromium',
      dependencies:['setup'],
      use: { ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 800 },
        storageState: 'e2e/playwright/.auth/user.json'
      },
    },
    {
      name: 'firefox',
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
       storageState: 'e2e/playwright/.auth/user.json'
      },
    },

    {
      name: 'webkit',
      dependencies: ['setup'],
      use: { ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
       storageState: 'e2e/playwright/.auth/user.json'
       },
    }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
