/**
 * Description This class includes tests 
 * 1. for adding, searching and downloading a new Recruitement after logging in using state files based on data provided in orangedata.json
 * for newly adding Recruiter details
 **/

import { test, expect } from "../../../fixtures/customFixtures";
import { getRandomEmployeeDetails } from "../../../testdata/random";

const fs = require('node:fs');
const path = require('node:path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../testdata/orangeData.json')));
const fileUploadResume= (path.resolve(__dirname, '../../../testdata/UploadResume.txt'));
const fileDownloadResume= (path.resolve(__dirname, '../../../testdata/DownloadResume.txt'));

test("Orange HRM Add Recruiter Page test", {tag: ['@regression', '@ui']}, async ({ baseURL,loginPage, homePage, candidateshomePage, addCandidatesPage }) => {
    
    await test.step('Open the APP', async () => {
      await loginPage.visit();  
    })

    await test.step('Navigate to Candidates Screen for adding Candidate', async () => {
      await homePage.getLeftMenuComponent().selectLeftMenuItem("Recruitment");
      await homePage.getTopMenuComponent().selectTopMenuItem("Candidates");
    })

    await test.step('Validate the Operation on Add Candidate Page', async () => {
      await candidateshomePage.clickAddCdButton();
      await addCandidatesPage.addCandidateDetails(getRandomEmployeeDetails());

    // Available options are: Kindly Upload the correct value in orangeData.json
    // AWS engineer1, docker expert1, Junior Account Assistant, 
    // Payroll Administrator, QA, Sales Representative, sandra, sandra, Senior QA Lead, 
    // Senior Support Specialist, Software Engineer, test
      await addCandidatesPage.selectvaluefromVacancyDropdown(testData.AddRecruiter.vacancy);
      await addCandidatesPage.selectDateofApplicationCalender(testData.AddRecruiter.dateYYYY_DD_YY);
      await addCandidatesPage.uploadResume(fileUploadResume);
      await addCandidatesPage.clickConsentcheckbox();
      console.log("FileUploadResume: "+fileUploadResume);

      await addCandidatesPage.clickSaveButton();
      await addCandidatesPage.isCandidateAddedSuccessfully();
    })

    await test.step('Reject the Newly Added Candidate', async () => {
      await addCandidatesPage.clickRejectButton();
      await addCandidatesPage.clickSaveButton();
    })
    
    await test.step('Navigate to Candidates Screen for searching recently added Candidate', async () => {
      await homePage.getLeftMenuComponent().selectLeftMenuItem("Recruitment");
      await homePage.getTopMenuComponent().selectTopMenuItem("Candidates");
    })  
    
    await test.step('Search the Recently Added Candidate and Download Resume', async () => {
      console.log(addCandidatesPage.firstName+" "+addCandidatesPage.lastName);
      await candidateshomePage.searchCandidate(addCandidatesPage.firstName+" "+addCandidatesPage.lastName);
      await candidateshomePage.clickSearchButton();
      await candidateshomePage.isCandidateFoundSuccessfully();
      await candidateshomePage.downloadResume(fileDownloadResume);
    })
    
  });