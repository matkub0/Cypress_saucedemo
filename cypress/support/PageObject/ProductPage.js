class ProductPage {
  backToProduct() {
    cy.get('[data-test="back-to-products"]').click();
    return this;
  }
  addToCart() {
    cy.get('[class="btn btn_primary btn_small btn_inventory"]').click();
    cy.get('[class="btn btn_secondary btn_small btn_inventory"]').should(
      "have.text",
      "Remove"
    );
    cy.get('[class="shopping_cart_badge"]').should("contain", "1");
    return this;
  }
}
export default ProductPage;
