// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

describe("Onboarding", () => {
  it("Display onboarding after registration", () => {
    cy.interceptRegister();
    cy.interceptGetOnboarding();

    cy.visitPath("");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=email]").type("test@test.com");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.contains("button", "Create").click();

    cy.contains("First Name");
    cy.contains("Last Name");
    cy.contains("Bio");
  });

  it("Display onboarding after registration from /register", () => {
    cy.interceptRegister();
    cy.interceptGetOnboarding();

    cy.visitPath("register");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=email]").type("test@test.com");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.contains("button", "Create").click();

    cy.contains("First Name");
    cy.contains("Last Name");
    cy.contains("Bio");
  });

  it("Elements are named", () => {
    cy.interceptRegister();
    cy.interceptGetOnboarding();

    cy.visitPath("register");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=email]").type("test@test.com");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.contains("button", "Create").click();

    // First page
    cy.get("[name=firstName]").type("first");
    cy.get("[name=lastName]").type("last");
    cy.get("[name=bio]").type("bio");
    cy.contains("button", "Next").click();

    // Second page
    cy.get("[name=country]");
    cy.get("[name=receiveNotifications]");
    cy.get("[name=receiveUpdates]");
  });
});
