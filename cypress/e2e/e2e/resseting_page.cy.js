describe("resseting-page", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("T-01 (Verify reset app state button reset items in cart))", () => {
    cy.addProduct(3);
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[id="reset_sidebar_link"]').click();
    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("not.exist");
  });

  it.only("T-02 (Verify reset app state button reset sorting options on product list)", () => {
    cy.get('[data-test="product_sort_container"]').select("za");
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[id="reset_sidebar_link"]').click();
    cy.get(".inventory_item_name")
      .first()
      .should("have.text", "Sauce Labs Backpack");
  });
});
