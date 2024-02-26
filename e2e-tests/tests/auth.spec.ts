import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  //getting signin button
  await page.getByRole("link", { name: "Sign In" }).click();

  // Checking is page getting navigated to /sign-in
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  //finding input elements of Email and Password
  await page.locator("[name='email']").fill("naveen@gmail.com");
  await page.locator("[name='password']").fill("123123");
  await page.getByRole("button", { name: "Login" }).click();

  //finding toastsaying signin successfull and button (My Bookings, My Hotels, Sign out)
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const Email = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(`${UI_URL}register`);

  // register page confirmation
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  // await expect(page.locator("[name:'email']")).toBeVisible();
  // await expect(page.locator("[name:'password']")).toBeVisible();

  // returning back to register page
  await page.goto(`${UI_URL}register`);

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  await page.locator("[name='firstName']").fill("Naveen");
  await page.locator("[name='lastName']").fill("Kumar");
  await page.locator("[name='email']").fill(Email);
  await page.locator("[name='password']").fill("123123");
  await page.locator("[name='confirmPassword']").fill("123123");
  await page.getByRole("button", { name: "Create Account" }).click();

  //making sure it goes to home page
  //await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
