class Navigation {
  goToMenu() {
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get(".bm-item-list").should("be.visible");
    return this;
  }
  resetPage() {
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[id="reset_sidebar_link"]').click();
    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("not.exist");
    return this;
  }
  allProducts() {
    cy.get("#inventory_sidebar_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    return this;
  }
  about() {
    cy.get("#about_sidebar_link").click();
    cy.url().should("eq", "https://saucelabs.com/");
    return this;
  }
  logout() {
    cy.get("#logout_sidebar_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/");
    return this;
  }
}
export default Navigation;
