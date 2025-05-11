const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { takeKrakenScreenshot: takeScreenshot } = require('../../../takeScreenshot');
const properties = require('../../../properties.json');

const regex = /^(ESC\d{3})/;

Before(function (scenario) {
  this.scenarioName = scenario.pickle.name;
  const match = this.scenarioName.match(regex);

  if (match) {
    this.scenarioNumber = match[1];
  } else {
    this.scenarioNumber = 0;
  }
});

Given('the user is on the page {kraken-string}', async function (page) {
  const fullUrl = properties.URL + '/' + page;
  await this.driver.url(fullUrl);
});

When('the user enters user and password', async function () {
  const emailInput = await this.driver.$('input[name="identification"]');
  await emailInput.setValue(properties.EMAIL);

  const passwordInput = await this.driver.$('input[name="password"]');
  await passwordInput.setValue(properties.PASSWORD);

  const submitButton = await this.driver.$('button[type="submit"]');
  await submitButton.click();
});

Then('{kraken-string} they should be redirected to {kraken-string}', async function (step, page) {
  const currentUrl = await this.driver.getUrl();
  if (!currentUrl.includes('/' + page)) {
    throw new Error(`Expected URL to include "/${page}", but got "${currentUrl}"`);
  }
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});

When('{kraken-string} the user navigates to the {kraken-string} section', async function (step, section) {
  const fullUrl = properties.URL + '/' + section;
  await this.driver.url(fullUrl);
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});

When('{kraken-string} the user clicks on the {kraken-string} link', async function (step, link) {
  const linkElement = await this.driver.$(`a=${link}`);
  await linkElement.click();
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});

When('{kraken-string} they enter the value {kraken-string} in the {kraken-string} field of type {kraken-string}', async function (step, value, field, typeInput) {
  const inputElement = await this.driver.$(`${typeInput}[name="${field}"]`);
  await inputElement.setValue(value);
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});

When('{kraken-string} the user clicks on the {kraken-string} button', async function (step, button) {
  const buttonElement = await this.driver.$(`button=${button}`);
  await buttonElement.click();
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});

Then('{kraken-string} the user should see the error message {kraken-string}', async function (step, message) {
  const errorElement = await this.driver.$$('.response');
  errorFound = errorElement.filter(async (errorElement) => {
    const errorText = await errorElement.getText();
    return errorText.includes(message);
  });

  if (!errorFound) {
    throw new Error(`Expected error message to include "${message}", but it was not found.`);
  }
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});

Then('{kraken-string} the user should see the tag {kraken-string} in the list of tags', async function (step, tagName) {
  const tagElements = await this.driver.$$('.gh-tag-list-name');
  let tagFound = false;
  tagFound = tagElements.filter(async (tagElement) => {
    const tagText = await tagElement.getText();
    return tagText.includes(tagName);
  });

  if (!tagFound) {
    throw new Error(`Expected tag list to include "${tagName}", but it was not found.`);
  }
  await takeScreenshot(this.driver, this.scenarioNumber, step);
});