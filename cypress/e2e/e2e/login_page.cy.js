describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test case T-01 (Check results when valid username and password is entered)", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("Test case T-02 (Check results when not valid username and password is entered)", () => {
    cy.get('[data-test="username"]').type("invalid_user");
    cy.get('[data-test="password"]').type("secret_saucee");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Test case T-03 (Check results when is entered blocked user username and password)", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("Test case T-04 (Verify the time taken to log in with valid username and password)", () => {
    cy.get('[data-test="username"]').type("performance_glitch_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("Test case T-05 (Check results when username and password is blank)", () => {
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username is required"
    );
  });

  it("Test case T-06 (Check results when username is blank)", () => {
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username is required"
    );
  });

  it("Test case T-07 (Check results when password is blank)", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Password is required"
    );
  });

  it("Test case T-08 (Check results after closing information about wrong password)", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_saucee");
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-button").click();
    cy.get(".error-button").should("not.exist");
  });
});
