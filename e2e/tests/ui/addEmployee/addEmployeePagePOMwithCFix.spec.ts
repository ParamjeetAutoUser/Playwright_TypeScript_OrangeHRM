/**
 * Description This class includes tests 
 * 1. for adding a new employee after logging in using state files based on data provided in orangedata.json
 * for newly adding employee
 **/

import { test, expect } from "../../../fixtures/customFixtures";
import { getRandomEmployeeDetails } from "../../../testdata/random";

const fs = require('node:fs');
const path = require('node:path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../testdata/orangeData.json')));

test("Orange HRM Add Employee page test", {tag: ['@regression', '@ui']}, async ({ baseURL, loginPage, homePage, addEmployeePage, personaldetailsPage }) => {
  
  await test.step('Open the APP', async () => {
    await loginPage.visit();  
  })

  await test.step('Navigate to PIM Module Screen', async () => {
    await homePage.getLeftMenuComponent().selectLeftMenuItem("PIM");
    await homePage.getTopMenuComponent().selectTopMenuItem("Add Employee");
  })
    //await loginPage.login("Admin", "admin123");
    
  await test.step('Validate the Operation on Add Employee Page', async () => {
    await addEmployeePage.addEmployeeDetails(getRandomEmployeeDetails());
    await addEmployeePage.enableLoginDetails();
    await addEmployeePage.addLoginDetails();
    await addEmployeePage.clickSaveButton();
    await expect(addEmployeePage.successMessage).toBeVisible();
    await personaldetailsPage.isPersonalDetailsPageDisplayedSuccessfully(); 
  })
    
  });