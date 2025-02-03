import { Locator, Page } from "@playwright/test";
import { EmployeeDetails } from "../testdata/orangeHrmInterfaces";


export class AddEmployeePage {

    readonly page: Page;
    
    public firstName: string;
    public lastName: string;
    public password: string = "Password@";
    public emplId: string;
    public username: string;
    public confpassword: string;

    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly middleNameTextBox: Locator;
    readonly idTextBox: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;

    readonly loginDetailsChkBox: Locator;
    readonly usernNameTxtBox: Locator;
    readonly passwordTxtBox: Locator;
    readonly confirmPasswordTxtBox: Locator;
    
    constructor(page: Page) {
        this.page= page
        this.firstNameTextBox = page.getByRole("textbox", { name: "First Name"});
        this.lastNameTextBox = this.page.getByRole("textbox", {name: "Last Name",});
        this.middleNameTextBox = this.page.getByRole("textbox", {name: "Middle Name"});
        this.idTextBox = this.page.locator("form").getByRole("textbox").nth(4);
        this.saveButton = this.page.getByRole("button", { name: "Save" });
        this.successMessage = this.page.getByText(/Successfully Saved/i);
        
        this.loginDetailsChkBox= this.page.locator("form span");
        this.usernNameTxtBox= this.page.locator("div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input");
        this.passwordTxtBox= this.page.locator('input[type="password"]').first();
        this.confirmPasswordTxtBox= this.page.locator('input[type="password"]').nth(1);
    }

    async addEmployeeDetails(employeeDetails: EmployeeDetails) {
        this.firstName= employeeDetails.firstName;
        await this.firstNameTextBox.fill(this.firstName);

        this.lastName= employeeDetails.lastName;
        await this.lastNameTextBox.fill(this.lastName);
        await this.middleNameTextBox.fill(employeeDetails.middleName);

        this.emplId= employeeDetails.employeeId;
        await this.idTextBox.fill(this.emplId);
        
    }
    async clickSaveButton(){
        await this.saveButton.click();
    }

    async isEmployeeAddedSuccessfully() {
        await (this.successMessage);
    }

    async enableLoginDetails(){
        await this.loginDetailsChkBox.click();
    }

    async addLoginDetails(){
        await this.usernNameTxtBox.fill(this.firstName+"_"+this.lastName);
        await this.passwordTxtBox.fill(this.password+this.emplId);
        await this.confirmPasswordTxtBox.fill(this.password+this.emplId)
    }

}

//export default AddEmployeePage;