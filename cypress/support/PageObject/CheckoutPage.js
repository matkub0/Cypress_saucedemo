class CheckoutPage {
  continue() {
    cy.get('[data-test="continue"]').click();
    return this;
  }
  erorr(name) {
    cy.get('[data-test="error"]').should("have.text", name);
    return this;
  }
  firstName(name) {
    cy.get('[data-test="firstName"]').type(name);
    return this;
  }
  postalCode(code) {
    cy.get('[data-test="postalCode"]').type(code);
    return this;
  }
  lastName(name) {
    cy.get('[data-test="lastName"]').type(name);
    return this;
  }
  checkUrl() {
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");
    return this;
  }
}
export default CheckoutPage;
