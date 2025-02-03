/**
 * Description This function logs into the application and then saves  
 * state into authFile which is being used in playwright.config.js file for  
 * logging into application
 */

import { test as setup } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
const fs = require('node:fs');
const path = require('node:path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../testdata/orangeData.json')));
const authFile = 'e2e/playwright/.auth/user.json';

setup("Orange HRM Login Setup", async ({ page }) => {
    // Peform Login Once
    const logPage = new LoginPage(page);
    await logPage.visit();
    await logPage.login(testData.validCredentials.username, testData.validCredentials.password);
    // Save signed-in state to STORAGE_STATE.
    await page.context().storageState({ path: authFile });
  });