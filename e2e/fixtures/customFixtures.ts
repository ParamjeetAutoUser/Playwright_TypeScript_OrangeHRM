import { test as base } from "@playwright/test";

import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { AddEmployeePage } from "../pages/addEmployeePage";
import { AddCandidatesPage } from "../pages/addCandidatesPage";
import { CandidatesHomePage } from "../pages/candidatesHomePage";
import { PersonalDetailsPage } from "../pages/personaldetailsPage";

interface PageFixtures {
    loginPage: LoginPage;
    homePage: HomePage;
    addEmployeePage: AddEmployeePage;
    candidateshomePage:CandidatesHomePage;
    addCandidatesPage: AddCandidatesPage;
    personaldetailsPage: PersonalDetailsPage;
    
  }
  
  export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
      await use(new HomePage(page));
    },
    addEmployeePage: async ({ page }, use) => {
      await use(new AddEmployeePage(page));
    },
    candidateshomePage: async ({ page }, use) => {
        await use(new CandidatesHomePage(page));
    },
    addCandidatesPage: async ({ page }, use) => {
        await use(new AddCandidatesPage(page));
    },
    personaldetailsPage: async ({ page }, use) => {
      await use(new PersonalDetailsPage(page));
    }
    
  });
  
  //export default test;
  export { expect } from "@playwright/test";