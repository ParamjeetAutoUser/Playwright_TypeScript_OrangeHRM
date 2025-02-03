import { Locator, Page, expect,test } from "playwright/test";
import HomePage from "./homePage";
const fs = require('node:fs');
const path = require('node:path');
const testData = require('../dataconfig/dataconfig.ts');

export class LoginPage {
    
    readonly page: Page;
    readonly userNameTextBox:Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page= page
        this.userNameTextBox = page.getByPlaceholder("Username");
        this.passwordTextBox = page.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button", {name: "Login"});
    }

    async visit() {
        let browser: import('playwright').Browser;
        
        await this.page.goto(testData.landingPageUrl, { timeout: 80000 });
        //await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username: string, password: string) {
        await this.userNameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
        return new HomePage(this.page);
    }
}

//export default LoginPage;