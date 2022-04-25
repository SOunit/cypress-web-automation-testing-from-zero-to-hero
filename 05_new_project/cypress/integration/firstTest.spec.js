/// <reference types="cypress" />

describe("Test with backend", () => {
  beforeEach("login to the app", () => {
    cy.loginToApplication();
  });

  it("should login", () => {
    cy.log("Yes we login!");
  });
});
