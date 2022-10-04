/// <reference types = 'cypress' />

import ShopPage from "../support/PageObject/ShopingPage";
import Navigation from "../support/PageObject/Navigation";

describe("Test resetting page", function () {
  const product = new ShopPage();
  const navigation = new Navigation();
  beforeEach(function () {
    cy.login("standard_user", "secret_sauce");
  });
  it("T-01 (Verify reset app state button reset items in cart)", function () {
    product.addToCart(3);
    navigation.resetPage();
  });
});
