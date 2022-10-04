describe("Navigation-tests", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("T-01 (Check results when clicking on menu button)", () => {
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get(".bm-item-list").should("be.visible");
  });

  it("T-02 (Check results when clicking on twitter icon)", () => {
    cy.get(".social_twitter > a").invoke("removeAttr", "target").click();
    cy.url().should("include", "twitter.com/saucelabs");
  });

  it("T-03 (Check results when clicking on linkedin icon)", () => {
    cy.get(".social_linkedin > a").invoke("removeAttr", "target").click();
    cy.url().should("include", "linkedin.com/");
  });

  it("T-04 (Check results when clicking on facebook icon)", () => {
    cy.get(".social_facebook >a").invoke("removeAttr", "target").click();
    cy.url().should("include", "facebook.com/saucelabs");
  });

  it("T-05 (Check results when clicking on cart icon)", () => {
    cy.get(".shopping_cart_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/cart.html");
  });

  it('T-06 (Check "back to products" button")', () => {
    cy.get(".inventory_item_name").last().click();
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it.only('T-07 (Check "All products" button in slide menu)', () => {
    cy.get(".shopping_cart_link").click();
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get("#inventory_sidebar_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it('T-08 (Check "About" button in slide menu)', () => {
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get("#about_sidebar_link").click();
    cy.url().should("eq", "https://saucelabs.com/");
  });

  it('T-09 (Check "logout" button in slide menu)', () => {
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get("#logout_sidebar_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/");
  });
});
