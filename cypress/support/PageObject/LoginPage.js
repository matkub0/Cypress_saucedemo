class LoginPage {
  navigate() {
    cy.visit("/");
    return this;
  }

  enterUser(username) {
    cy.get('[data-test="username"]').type(username);
    return this;
  }

  enterPassword(password) {
    cy.get('[data-test="password"]').type(password);
    return this;
  }

  submit() {
    cy.get('[data-test="login-button"]').click();
    return this;
  }

  checkUrl(url) {
    cy.url().should("be.equal", url);
    return this;
  }

  checkError(message) {
    cy.get('[data-test="error"]').should("have.text", message);
    return this;
  }

  closeError() {
    cy.get(".error-button").click().should("not.exist");
    return this;
  }
}
export default LoginPage;
