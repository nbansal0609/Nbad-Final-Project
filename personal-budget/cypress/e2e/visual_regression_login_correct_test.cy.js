/// <reference types="Cypress" />

describe("login tests", () => {
  it("Website does work with correct credentials test", () => {
    cy.eyesOpen({
      appName: "Personal Budget",
      testName: "Fill form to login",
    });
    cy.visit("/home");
    cy.contains("a.nav-link", "Login / Sign up").click();

    cy.hash().should("eq", "#/login");

    cy.eyesCheckWindow({
      tag: "Login page",
      target: "window",
      fully: true,
    });
    cy.screenshot();

    cy.get("[data-cy=username")
      .type("n@b.com")
      .should("have.value", "n@b.com");
    cy.get("[data-cy=password").type("test123").should("have.value", "test123");
    cy.get("[data-cy=login-form").submit();

    cy.hash().should("eq", "#/dashboard");

    cy.eyesCheckWindow({
      tag: "Dashboard",
      target: "window",
      fully: true,
    });
    cy.screenshot();

    cy.eyesClose();
  });
});
