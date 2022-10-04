class Footer {
  twitter() {
    cy.get(".social_twitter > a").invoke("removeAttr", "target").click();
    cy.url().should("include", "twitter.com/saucelabs");
    return this;
  }
  facebook() {
    cy.get(".social_facebook >a").invoke("removeAttr", "target").click();
    cy.url().should("include", "facebook.com/saucelabs");
    return this;
  }
  linkedin() {
    cy.get(".social_linkedin > a").invoke("removeAttr", "target").click();
    cy.url().should("include", "linkedin.com/");
    return this;
  }
}
export default Footer;
