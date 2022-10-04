/// <reference types = 'cypress' />

import ShopPage from "../support/PageObject/ShopingPage";
import ProductPage from "../support/PageObject/ProductPage";
import Navigation from "../support/PageObject/Navigation";
import Footer from "../support/PageObject/Footer";

describe("Test navigation on page", function () {
  const product = new ShopPage();
  const navigation = new Navigation();
  const footer = new Footer();
  const item = new ProductPage();
  beforeEach(function () {
    cy.fixture("login").then(function (testdata) {
      this.testdata = testdata;
    });
    cy.login("standard_user", "secret_sauce");
  });
  it("T-01 (Check results when clicking on menu button", function () {
    navigation.goToMenu();
  });
  it("T-02 (Check results when clicking on twitter icon", function () {
    footer.twitter();
  });
  it("T-03 (Check results when clicking on linkedin icon)", function () {
    footer.linkedin();
  });
  it("T-04 (Check results when clicking on facebook icon)", function () {
    footer.facebook();
  });
  it("T-05 (Check results when clicking on cart icon)", function () {
    product.goToCart();
  });
  it('T-06 (Check "back to products" button")', function () {
    product.clickProductName(4);
    item.backToProduct();
  });
  it('T-07 (Check "All products" button in slide menu', function () {
    product.clickProductName(0);
    navigation.goToMenu().allProducts();
  });
  it('T-08 (Check "About" button in slide menu)', function () {
    navigation.goToMenu().about();
  });
  it('T-09 (Check "logout" button in slide menu)', function () {
    navigation.goToMenu().logout();
  });
});
