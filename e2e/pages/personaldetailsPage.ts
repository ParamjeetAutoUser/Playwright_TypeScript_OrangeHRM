import { expect, Locator, Page } from "@playwright/test";


export class PersonalDetailsPage{
    readonly page: Page;

    readonly personaldetailsHeader: Locator;

    constructor(page: Page) {
            this.page= page
            this.personaldetailsHeader = page.getByRole('heading', { name: 'Personal Details' });
    }
    
    async isPersonalDetailsPageDisplayedSuccessfully() {

        await expect(this.personaldetailsHeader).toBeVisible();
    }

}