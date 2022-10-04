describe("Shoping-page", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("T-01 (Check results when product name is clicked)", () => {
    cy.get(".inventory_item_name")
      .eq(3)
      .parent("a")
      .then((link) => {
        const linkid = link[0].id;
        const id = linkid.match(/\d/)[0];
        cy.get(".inventory_item_name").eq(3).click();
        cy.url().should(
          "eq",
          `https://www.saucedemo.com/inventory-item.html?id=${id}`
        );
      });
  });

  it("T-02 (Check results when product image is clicked)", () => {
    cy.get(".inventory_item_img")
      .eq(1)
      .parent("a")
      .then((link) => {
        const linkjpg = link[0].id;
        const id = linkjpg.match(/\d/)[0];
        cy.get(".inventory_item_img").eq(1).click();
        cy.url().should(
          "eq",
          `https://www.saucedemo.com/inventory-item.html?id=${id}`
        );
      });
  });

  it('T-03 (Check "back to products" button)', () => {
    cy.get(".inventory_item_name").first().click();
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it("T-04 (Check results when products list sorted by name (Z to A))", () => {
    cy.get('select[data-test="product_sort_container"]').select("za");
    cy.get(".inventory_item_img")
      .parent("a")
      .children("img")
      .then((name) => {
        name.toArray().forEach((element, index) => {
          if (index + 1 !== name.length) {
            console.log(element.alt, ">", name[index + 1].alt);
            expect(element.alt > name[index + 1].alt).to.be.true;
          }
        });
      });
  });

  it("T-05 (Check results when products list sorted by name (A to Z))", () => {
    cy.get('select[data-test="product_sort_container"]').select("az");
    cy.get(".inventory_item_img")
      .parent("a")
      .children("img")
      .then((name) => {
        name.toArray().forEach((element, index) => {
          if (index + 1 !== name.length) {
            expect(element.alt < name[index + 1].alt).to.be.true;
          }
        });
      });
  });

  it("T-06 (Check results when products list sorted by price (low to high))", () => {
    cy.get('select[data-test="product_sort_container"]').select("lohi");
    cy.get(".inventory_item_price").then((price) => {
      price.toArray().forEach((element, index) => {
        if (index + 1 !== price.length) {
          expect(
            parseFloat(element.outerText.replace("$", "")) <=
              parseFloat(price[index + 1].outerText.replace("$", ""))
          ).to.be.true;
        }
      });
    });
  });

  it("T-07 (Check results when products list sorted by price (high to low))", () => {
    cy.get('select[data-test="product_sort_container"]').select("hilo");
    cy.get(".inventory_item_price").then((price) => {
      price.toArray().forEach((element, index) => {
        if (index + 1 !== price.length) {
          expect(
            parseFloat(element.outerText.replace("$", "")) >=
              parseFloat(price[index + 1].outerText.replace("$", ""))
          ).to.be.true;
        }
      });
    });
  });

  it("T-08 (Check results when product is added to cart from list view)", () => {
    cy.get('[class="btn btn_primary btn_small btn_inventory"]').first().click();
    cy.get('[class="btn btn_secondary btn_small btn_inventory"]').should(
      "have.text",
      "Remove"
    );
    cy.get('[class="shopping_cart_badge"]').should("contain", "1");
  });

  it("T-09 (Check results when product is added to cart from product subpage)", () => {
    cy.get(".inventory_item_name").last().click();
    cy.get('[class="btn btn_primary btn_small btn_inventory"]').click();
    cy.get('[class="btn btn_secondary btn_small btn_inventory"]').should(
      "have.text",
      "Remove"
    );
    cy.get('[class="shopping_cart_badge"]').should("contain", "1");
  });

  it("T-10 (Check results when product is deleted from cart)", () => {
    cy.get('[class="btn btn_primary btn_small btn_inventory"]').first().click();
    cy.get('[class="shopping_cart_link"]').click();
    cy.get('[class="btn btn_secondary btn_small cart_button"]')
      .should("have.text", "Remove")
      .click();
    cy.get('[class="shopping_cart_badge"]').should("not.exist");
    cy.get('[class="cart_item"]').should("not.exist");
  });

  it("T-11 (Check results when checkout button is clicked  with product in cart)", () => {
    cy.get('[class="btn btn_primary btn_small btn_inventory"]').first().click();
    cy.get('[class="shopping_cart_link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
  });

  it("T-12 (Check results when step one of checkout have empty First Name/ Last Name and Zip code)", () => {
    cy.addProduct(0);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Error: First Name is required"
    );
  });

  it("T-13 (Check results when step one of checkout have empty Last Name)", () => {
    cy.addProduct(0);
    cy.get('[data-test="firstName"]').type("21");
    cy.get('[data-test="postalCode"]').type("37");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Error: Last Name is required"
    );
  });

  it("T-14 (Check results when step one of checkout have empty Postal Code)", () => {
    cy.addProduct(1);
    cy.get('[data-test="firstName"]').type(21);
    cy.get('[data-test="lastName"]').type(37);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Error: Postal Code is required"
    );
  });

  it("T-15 (Check results when First Name Last Name and Zip code are filled correctly)", () => {
    cy.addProduct(2);
    cy.checkout("xd", "1234", "666");
    cy.get('[data-test="continue"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");
  });

  it("T-16 (Check results when finish button is clicked)", () => {
    cy.addProduct(1);
    cy.checkout("xd", "1234", "666");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
  });

  it('T-17 (Check results when "back to home" buttos is clicked)', () => {
    cy.addProduct(1);
    cy.checkout("xd", "1234", "666");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });
});
