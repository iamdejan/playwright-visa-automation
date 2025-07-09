import { expect, test } from '@playwright/test';

test.describe("UM Maya Portal", () => {
  test("[Admission: e-Visa Approval Letter / Approval to Study] Check status", async ({page}) => {
    await page.goto("https://maya.um.edu.my/sitsvision/wrd/siw_lgn");
    await page.getByLabel("Username").fill(process.env.UM_MAYA_USERNAME!);
    await page.getByLabel("Password").fill(process.env.UM_MAYA_PASSWORD!);
    await page.locator("input.sv-btn").click();

    // Dashboard page
    await page.locator("a#STUAD00").click();

    // Admission page
    await page.getByText("Continue Acceptance").click();

    // Accept Admission Offer page
    const statusLocator = page.locator(".odd > td:nth-child(4)");
    const status = (await statusLocator.textContent())?.trim();
    console.log(status);

    // Logout
    await page.locator("li.sv-dropdown:nth-child(1) > a:nth-child(1)").click();
    await page.locator("li.sv-dropdown:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)").click();

    const backToLoginPageLocator = page.getByText("Back to Login Page");
    await expect(backToLoginPageLocator).toBeEnabled();
    await backToLoginPageLocator.click();
  });
});
