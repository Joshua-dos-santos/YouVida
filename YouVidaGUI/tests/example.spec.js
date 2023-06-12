import {test, expect} from "@playwright/test";

test('has title', async ({ page }) => {
  await page.goto('https://joshua.mdjansen.nl/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Youvida/);
});

test('Add and delete post', async ({ page }) => {
  await page.goto('https://joshua.mdjansen.nl/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Username or email address').click();
  await page.getByLabel('Username or email address').fill('Sander@kwetter.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('7bNTs6yMf9bc8KR');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Profile' }).click({delay: 5000});
  await page.locator('div').filter({ hasText: /^Delete AccountPosts: 1Followers: 0Following: 0$/ }).locator('svg').first().click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('new post');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('#root div').filter({ hasText: 'Delete AccountPosts: 2Followers: 0Following: 0sandernew postfrom: @sander12/06/2' }).locator('svg').nth(2).click();
});

test('test', async ({ page }) => {
  let r = (Math.random() + 1).toString(36).substring(2);
  await page.goto('https://joshua.mdjansen.nl/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(r);
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(r+'@email.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('N'+r+'1');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Profile' }).click({delay: 5000});
  await page.getByRole('button', { name: 'Delete Account' }).click();
});