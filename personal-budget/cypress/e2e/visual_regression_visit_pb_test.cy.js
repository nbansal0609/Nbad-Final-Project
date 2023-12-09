/// <reference types="Cypress" />

describe("Visit Personal Budget", () => {
  it("Website URL test works", () => {
    cy.eyesOpen({
      appName: "Personal Budget",
      testName: "Visit home",
    });

    cy.visit("/home");

    cy.eyesCheckWindow({
      tag: "Login page",
      target: "window",
      fully: true,
    });

    cy.eyesClose();
  });
});
