import { expect, Locator, Page } from "@playwright/test";
import { AddCandidatesPage } from "./addCandidatesPage";



export class CandidatesHomePage{

    readonly page: Page;
    readonly candidateNameTextBox:Locator;
    readonly searchButton: Locator;
    readonly addCandidateButton: Locator;
    readonly searchsuccessMessage:Locator;
    readonly downloadButtonSelector:Locator;

    
    constructor(page: Page) {
        this.page= page
        this.candidateNameTextBox = page.getByPlaceholder("Type for hints...");
        this.searchButton = page.getByRole("button", {name: "Search"});
        this.addCandidateButton = page.getByRole("button", {name: "Add"});
        this.searchsuccessMessage = this.page.getByText(/(1) Record Found/i);
        this.downloadButtonSelector = this.page.locator('//i[@class="oxd-icon bi-download"]');
    }

    async clickSearchButton(){
        
        await this.searchButton.click();
        //await this.page.waitForTimeout(3000);
    }

    async clickAddCdButton(){
        await this.addCandidateButton.click();
        await this.page.waitForTimeout(2000);
        return new AddCandidatesPage(this.page);
    }

    async searchCandidate(searchname:string){
        var splitted = searchname.split(" ", 2);
        var firstName= splitted[0];
        await this.candidateNameTextBox.fill(firstName);
        //await this.page.waitForTimeout(3000);
        await this.page.getByRole('option', { name: searchname }).click();
        //await this.page.waitForSelector('table[class*="oxd-table"]');
    }
    async isCandidateFoundSuccessfully() {
        await (this.searchsuccessMessage);
        console.log("Candidate Found Successfully")
        //await this.page.waitForSelector(this.searchsuccessMessage);
    }

    async downloadResume(resumedownloadpath:string){
        const downloadButton = await (this.downloadButtonSelector);
        await expect(downloadButton).toBeVisible();
        console.log('Download button count'+downloadButton.count());
        if (await downloadButton.count() === 0) {
            console.error('No download button found for the candidate.');
            await this.page.close();
            
        }
        
        else {
            // Set up a listener for the download
            const [download] = await Promise.all([
                this.page.waitForEvent('download'), // Wait for the download event
                downloadButton.first().click(), // Click the download button
            ]);

            // Save the downloaded file to a specific location
            await download.saveAs(resumedownloadpath);
            console.log('Resume downloaded successfully: ${resumedownloadpath}');
        }
    }

}
