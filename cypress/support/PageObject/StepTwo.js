class StepTwo {
  finish() {
    cy.get('[data-test="finish"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
    return this;
  }
  cancel() {
    cy.get('[data-test="cancel"]');
    return this;
  }
}
export default StepTwo;
