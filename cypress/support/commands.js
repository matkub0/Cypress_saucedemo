Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add("addProduct", (index) => {
  cy.get('[class="btn btn_primary btn_small btn_inventory"]').eq(index);
  cy.get('[class="shopping_cart_link"]').click();
  cy.get('[class="btn btn_action btn_medium checkout_button"]').click();
});

Cypress.Commands.add("checkout", (firstname, lastname, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstname);
  cy.get('[data-test="lastName"]').type(lastname);
  cy.get('[data-test="postalCode"]').type(postalCode);
});
