import { test } from '@playwright/test';

test.describe("Visa", () => {
  test("Check Progress", async ({page}) => {
    await page.goto("https://visa.educationmalaysia.gov.my/emgs/application/searchForm/");
    await page.locator("#travel_doc_no").fill(process.env.PASSPORT_NUMBER!!);
    await page.locator("select#nationality").selectOption(process.env.COUNTRY!!);
    await page.locator("input#agreement").check();
    await page.locator("#search-form-validate > div.buttons-set > button").click({ clickCount: 1 });

    // should redirect to new page
    const progressLocator = page.locator("#accordion1 > div > table > tbody > tr > td:nth-child(1) > h2");
    const progress = (await progressLocator.textContent())?.trim();
    console.log(progress);
  });
});
