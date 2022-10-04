class CompletePage {
  backToProduct() {
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  }
}
export default CompletePage;
