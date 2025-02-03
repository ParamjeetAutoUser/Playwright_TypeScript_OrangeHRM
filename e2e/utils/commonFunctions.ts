import { Locator, Page } from "@playwright/test";

export async function selectDropdownByText(page: Page, dropdownSelector: Locator, optionText: string) {

    await dropdownSelector.click();
    // Get all options in the dropdown
    const options = await (page.locator('//div[@class="oxd-select-option"]/span')).allInnerTexts();
    //console.log('Available options '+options);
    
    // Check if the given vacancy name exists
    if (!options.includes(optionText)) {
       throw new Error(`Vacancy "${optionText}" not found in the dropdown. Available options are: ${options.join(', ')}`);
    }
    
    else {
        const option = page.locator(`text=${optionText}`);
        await option.click();
    }
    
  }

  export async function selectDate(page: Page, dateInputSelector: Locator, dateValue: string=getTodaysDateInCustomFormat()) {
    // Regular expression to validate the date format 'YYYY-MM-DD'
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    // Validate the input date format
    if (!dateFormatRegex.test(dateValue)) {
      throw new Error('Invalid date format: "${dateValue}". Please use the YYYY-DD-MM format.');
    }
    // Split the input date into components
    const [year, day, month] = dateValue.split('-');
    const YYYYMMDDdatevalue: string= '${year}-${month}-${day}';
    console.log('YYYYMMDDdatevalue'+ YYYYMMDDdatevalue);

    // Validate individual components
    if (
        Number(year) < 1000 || Number(year) > 9999 || // Year validation
        Number(month) < 1 || Number(month) > 12 ||   // Month validation
        Number(day) < 1 || Number(day) > 31          // Day validation
    ) 
    {
        throw new Error('Invalid date components in "${dateValue}".');
    }

     // Validate the date is not in the future
    const inputDate = new Date(YYYYMMDDdatevalue);
    const today = new Date();
    console.log('Input date: '+inputDate);
    console.log('Today date: '+today);
    // Set today's time to midnight to avoid time-based mismatches
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
        throw new Error(
           'Invalid date: "${dateValue}". You cannot select a date in the future.'
        );
    }
  
    // Wait for the date input to be visible
    await (dateInputSelector);
    //await page.waitForSelector(dateInputSelector);
  
    // Focus on the date input field
    await dateInputSelector.fill(dateValue); // Fill the date input field with the desired value

  }

  /**
 * Generates today's date in 'YYYY-DD-MM' format.
 * @returns {string} Today's date as a string in 'YYYY-DD-MM' format.
 */
  export function getTodaysDateInCustomFormat(): string {
    const today = new Date();
    const year = today.getFullYear();
    const day = String(today.getDate()).padStart(2, '0'); // Ensure two-digit day
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  
    return '${year}-${day}-${month}';
  }


  