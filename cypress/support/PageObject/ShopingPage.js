class ShopPage {
  productName(num) {
    cy.get(".inventory_item_name").eq(num).click();
    return this;
  }
  clickProductName(num) {
    cy.get(".inventory_item_name")
      .eq(num)
      .parent("a")
      .then((link) => {
        const linkid = link[0].id;
        const id = linkid.match(/\d/)[0];
        cy.get(".inventory_item_name").eq(num).click();
        cy.url().should(
          "eq",
          `https://www.saucedemo.com/inventory-item.html?id=${id}`
        );
      });
    return this;
  }
  clickProductImg(num) {
    cy.get(".inventory_item_img")
      .eq(num)
      .parent("a")
      .then((link) => {
        const linkjpg = link[0].id;
        const id = linkjpg.match(/\d/)[0];
        cy.get(".inventory_item_img").eq(num).click();
        cy.url().should(
          "eq",
          `https://www.saucedemo.com/inventory-item.html?id=${id}`
        );
      });
    return this;
  }
  productImg(number) {
    cy.get(".inventory_item_img").eq(number).click();
    return this;
  }
  sortProductZA() {
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
    return this;
  }
  sortProductAZ() {
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
    return this;
  }
  sortProductHILOW() {
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
    return this;
  }
  sortProductLOWHI() {
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
    return this;
  }
  addToCart(num) {
    cy.get('[class="btn btn_primary btn_small btn_inventory"]').eq(num).click();
    cy.get('[class="btn btn_secondary btn_small btn_inventory"]').should(
      "have.text",
      "Remove"
    );
    cy.get('[class="shopping_cart_badge"]').should("contain", "1");
    return this;
  }
  goToCart() {
    cy.get('[class="shopping_cart_link"]').click();
    cy.url().should("be.equal", "https://www.saucedemo.com/cart.html");
    return this;
  }
}
export default ShopPage;
