class CartPage {
  deleteItem() {
    cy.get('[class="btn btn_secondary btn_small cart_button"]')
      .should("have.text", "Remove")
      .click();
    cy.get('[class="shopping_cart_badge"]').should("not.exist");
    cy.get('[class="cart_item"]').should("not.exist");
    return this;
  }
  goToCheckout() {
    cy.get('[class="shopping_cart_link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
    return this;
  }
}
export default CartPage;
