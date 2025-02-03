import { Locator, Page } from "@playwright/test";
import { EmployeeDetails } from "../testdata/orangeHrmInterfaces";
import { selectDate, selectDropdownByText } from "../utils/commonFunctions";

export class AddCandidatesPage{
    
    readonly page: Page;

    public firstName: string;
    public middleName: string;
    public lastName: string;

    readonly acFNameTextBox:Locator;
    readonly acMNameTextBox:Locator;
    readonly acLNameTextBox:Locator;
    readonly acVacanyDrpDwn: Locator;
    readonly acDateofApplication: Locator;

    readonly acEmailTextBox:Locator;
    readonly acContactTextBox:Locator;

    readonly acBrowseResume:Locator;
    readonly acResumeInput:Locator;

    readonly consKeepDataChkBox:Locator;
    readonly acSaveButton: Locator;
    readonly acsuccessMessage: Locator;
    readonly acApplicationStage: Locator;
    readonly acRejectButton: Locator;
        
    constructor(page: Page) {
        this.page= page;
        this.acFNameTextBox= page.getByPlaceholder('First Name');
        this.acMNameTextBox = page.getByPlaceholder('Middle Name');
        this.acLNameTextBox = page.getByPlaceholder('Last Name');
        this.acEmailTextBox = page.getByPlaceholder('Type here').first();
        this.acSaveButton = page.getByRole("button", {name: "Save"});
        this.consKeepDataChkBox = page.locator('form span i');
        this.acBrowseResume = page.getByText("Browse");
        this.acResumeInput = page.locator('input[type="file"]');
        this.acVacanyDrpDwn= page.locator('.oxd-select-text-input');
        this.acDateofApplication= page.getByPlaceholder('yyyy-dd-mm');
        this.acsuccessMessage = page.getByText(/Successfully Saved/i);
        this.acRejectButton = page.getByRole("button", {name: "Reject"});
        this.acApplicationStage = page.getByText(/Application Stage/i);
        
    }

    async addCandidateDetails(employeeDetails: EmployeeDetails) {

        this.firstName= employeeDetails.firstName;
        console.log("FirstName: "+this.firstName);
        await this.acFNameTextBox.fill(this.firstName);
        this.lastName= employeeDetails.lastName;
        console.log("LastName: "+this.lastName);
        await this.acLNameTextBox.fill(this.lastName);
        await this.acEmailTextBox.fill(this.firstName+"."+this.lastName+"@gmail.com");
        
    }
    async uploadResume(filePath){
        //await this.acBrowseResume.click();
        await this.acResumeInput.setInputFiles(filePath);
    }

    async clickConsentcheckbox(){
        await this.consKeepDataChkBox.click(); 
        await this.page.waitForTimeout(1000); 
    }

    async clickSaveButton(){
        await this.page.waitForTimeout(1000);
        await this.acSaveButton.click(); 
        console.log("Candidate Saved by clicking button save")
        await this.page.waitForTimeout(5000);
    }

    async selectvaluefromVacancyDropdown(optionVacationText:string='Senior QA Lead'){
        try{
            await selectDropdownByText(this.page, this.acVacanyDrpDwn, optionVacationText);
            const selectedoption= await (this.acVacanyDrpDwn).textContent();
            console.log("Selected value from Vacation dropdown is: "+selectedoption);
        }
        catch(error){
            console.error(error.message);
        }    
    }

    async selectDateofApplicationCalender(dateToBeSelected:string){
        try{
            await selectDate(this.page, this.acDateofApplication, dateToBeSelected);
        }
        catch(error)
        {
            console.error(error.message);
        }    
    }

    async isCandidateAddedSuccessfully() {
        await (this.acsuccessMessage);
    }

    
    async clickRejectButton(){
        await this.page.waitForTimeout(3000);
        await (this.acApplicationStage);
        console.log("Candidate Rejected by clicking button Reject")
        await this.acRejectButton.click();
    }


}