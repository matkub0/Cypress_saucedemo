/// <reference types = 'cypress' />

import LoginPage from "../support/PageObject/LoginPage";

describe("Test login page with POM", function () {
  const login = new LoginPage();
  beforeEach(function () {
    cy.fixture("login").then(function (testdata) {
      this.testdata = testdata;
    });
  });
  it("Test case T-01 (Check results when valid username and password is entered)", function () {
    login
      .navigate()
      .enterUser(this.testdata.username)
      .enterPassword(this.testdata.password)
      .submit()
      .checkUrl(this.testdata.url);
  });
  it("Test case T-02 (Check results when not valid username and password is entered)", function () {
    login
      .navigate()
      .enterUser(this.testdata.invalidUser)
      .enterPassword(this.testdata.invalidPassword)
      .submit()
      .checkError(
        "Epic sadface: Username and password do not match any user in this service"
      );
  });
  it("Test case T-03 (Check results when is entered blocked user username and password", function () {
    login
      .navigate()
      .enterUser(this.testdata.blockedUsername)
      .enterPassword(this.testdata.password)
      .submit()
      .checkError("Epic sadface: Sorry, this user has been locked out.");
  });
  it("Test case T-04 (Verify the time taken to log in with valid username and password)", function () {
    login
      .navigate()
      .enterUser(this.testdata.glitchUsername)
      .enterPassword(this.testdata.password)
      .submit();
  });
  it("Test case T-05 (Check results when username and password is blank)", function () {
    login.navigate().submit().checkError("Epic sadface: Username is required");
  });
  it("Test case T-06 (Check results when username is blank)", function () {
    login
      .navigate()
      .enterPassword(this.testdata.password)
      .submit()
      .checkError("Epic sadface: Username is required");
  });
  it("Test case T-07 (Check results when password is blank)", function () {
    login
      .navigate()
      .enterUser(this.testdata.username)
      .submit()
      .checkError("Epic sadface: Password is required");
  });
  it("Test case T-08 (Check results after closing information about wrong password)", function () {
    login
      .navigate()
      .enterUser(this.testdata.username)
      .enterPassword(this.testdata.invalidPassword)
      .submit()
      .closeError();
  });
});
