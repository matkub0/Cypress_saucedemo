/// <reference types = 'cypress' />

import ShopPage from "../support/PageObject/ShopingPage";
import ProductPage from "../support/PageObject/ProductPage";
import CartPage from "../support/PageObject/CartPage";
import CheckoutPage from "../support/PageObject/CheckoutPage";
import StepTwo from "../support/PageObject/StepTwo";
import CompletePage from "../support/PageObject/CompletePage";

describe("Test ShopingPage with POM", function () {
  const product = new ShopPage();
  const cart = new CartPage();
  const checkout = new CheckoutPage();
  const steptwo = new StepTwo();
  const complete = new CompletePage();
  const item = new ProductPage();
  beforeEach(function () {
    cy.login("standard_user", "secret_sauce");
  });
  it("T-01 (Check results when product name is clicked)", function () {
    product.clickProductName(3);
  });
  it("T-02 (Check results when product name is clicked)", function () {
    product.clickProductName(2);
  });
  it('T-03 (Check "back to products" button)', function () {
    product.productName(4);
    item.backToProduct();
  });
  it("T-04 (Check results when products list sorted by name (Z to A))", function () {
    product.sortProductZA();
  });
  it("T-06 (Check results when products list sorted by price (A to Z))", function () {
    product.sortProductAZ();
  });
  it("T-06 (Check results when products list sorted by price (high to low))", function () {
    product.sortProductHILOW();
  });
  it("T-06 (Check results when products list sorted by price (low to high))", function () {
    product.sortProductLOWHI();
  });
  it("T-08 (Check results when product is added to cart from list view)", function () {
    product.addToCart(3);
  });
  it("T-09 (Check results when product is added to cart from product subpage)", function () {
    product.clickProductName(1);
    item.addToCart();
  });
  it("T-10 (Check results when product is deleted from cart)", function () {
    product.addToCart(5).goToCart();
    cart.deleteItem();
  });
  it("T-11 (Check results when checkout button is clicked  with product in cart)", function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
  });
  it("T-12 (Check results when step one of checkout have empty First Name/ Last Name and Zip code)", function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
    checkout.continue().erorr("Error: First Name is required");
  });
  it("T-13 (Check results when step one of checkout have empty Last Name)", function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
    checkout
      .firstName("21a3a")
      .postalCode(66 - 666)
      .continue()
      .erorr("Error: Last Name is required");
  });
  it("T-14 (Check results when step one of checkout have empty Postal Code)", function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
    checkout
      .firstName("21a3a")
      .lastName("3hj7")
      .continue()
      .erorr("Error: Postal Code is required");
  });
  it("T-15 (Check results when First Name Last Name and Zip code are filled correctly)", function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
    checkout
      .firstName("21a3a")
      .lastName("3hj7")
      .postalCode("88-000")
      .continue()
      .checkUrl();
  });
  it("T-16 (Check results when finish button is clicked)", function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
    checkout
      .firstName("21a3a")
      .lastName("3hj7")
      .postalCode("88-000")
      .continue()
      .checkUrl();
    steptwo.finish();
  });
  it('T-17 (Check results when "back to home" buttos is clicked', function () {
    product.addToCart(5).goToCart();
    cart.goToCheckout();
    checkout
      .firstName("21a3a")
      .lastName("3hj7")
      .postalCode("88-000")
      .continue()
      .checkUrl();
    steptwo.finish();
    complete.backToProduct();
  });
});
