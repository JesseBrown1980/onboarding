// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

Cypress.Commands.add("checkPath", (path) => {
  return cy.url().should("eq", `http://localhost:3000/${path}`);
});

Cypress.Commands.add("visitPath", (path) => {
  return cy.visit(`http://localhost:3000/${path}`);
});

Cypress.Commands.add("interceptRegister", () => {
  return cy.intercept(
    {
      method: "POST",
      url: "http://localhost:3000/auth/register",
    },
    {
      id: 8,
      username: "test",
      email: "test@test.com",
      password:
        "f146844e46abedfcfd10b04e3bd4276574fa74ae8102495aff19839f4993ec9f",
      updatedAt: "2022-05-25T16:11:33.581Z",
      createdAt: "2022-05-25T16:11:33.581Z",
      salt: "10DoTe1tmaW6nRhxQuxAZw==",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjUzNDk1MDkzLCJleHAiOjE2NTM1ODE0OTN9.-vvMle8g-MkuDIgTR0S6yyPP_cPeknFxPf0j3gc2JR8",
      completedOnboarding: false,
    }
  );
});

Cypress.Commands.add("interceptGetOnboarding", () => {
  return cy.intercept(
    {
      method: "GET",
      url: "http://localhost:3000/api/onboarding",
    },
    {
      steps: [
        [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
          },
          {
            name: "bio",
            label: "Bio",
            type: "multiline-text",
          },
        ],
        [
          {
            name: "country",
            label: "Country",
            type: "text",
            required: true,
          },
          {
            name: "receiveNotifications",
            label:
              "I would like to receive email notifications for new messages when I'm logged out",
            type: "yes-no",
            required: true,
          },
          {
            name: "receiveUpdates",
            label:
              "I would like to receive updates about the product via email",
            type: "yes-no",
            required: true,
          },
        ],
      ],
    }
  );
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomField(availableFields){
  return availableFields[Math.floor(Math.random()*availableFields.length)];
}

Cypress.Commands.add("getRandomOnboarding",()=>{
  
  let availableRandomFields = [
    {
      name: "name",
      label: "Name",
      types: "text",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      types: "multiline-text",
      required: false,
    },
    {
      name: "acceptedTerms",
      label: "I accept terms and conditions",
      type: "yes-no",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      required: false,
    },
    {
      name: "birthdate",
      label: "Birthdate",
      type: "text",
      required: false,
    },
    {
      name: "gender",
      label: "Gender",
      type: "text",
      required: false,
    },
    {
      name: "interests",
      label: "Interests",
      type: "multiline-text",
      required: false,
    },
    {
      name: "bio",
      label: "Bio",
      type: "multiline-text",
      required: false,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "newsletter",
      label: "Subscribe to Newsletter",
      type: "yes-no",
      required: false,
    },
    {
      name: "favoriteColor",
      label: "Favorite Color",
      type: "text",
      required: false,
    },
    {
      name: "education",
      label: "Education",
      type: "text",
      required: true,
    },
    {
      name: "jobTitle",
      label: "Job Title",
      type: "text",
      required: false,
    },
    {
      name: "website",
      label: "Website",
      type: "text",
      required: false,
    },
    {
      name: "hobbies",
      label: "Hobbies",
      type: "multiline-text",
      required: false,
    },
    {
      name: "languages",
      label: "Languages",
      type: "text",
      required: false,
    },
  ];

  const onboardingSteps=getRandomInt(1,4);
  let steps = [];
  for(let step=1; step<=onboardingSteps; step++)
  {
    let newStep = [];
    const stepFields = getRandomInt(1,4);
    for(let field=1; field<=stepFields; field++){
      const newField=getRandomField(availableRandomFields);
      newStep.push(newField);

      const indexToRemove = availableRandomFields.findIndex(
        (item) => item.name === newField.name
      );
      if (indexToRemove !== -1) {
        availableRandomFields.splice(indexToRemove, 1);
      }
    }
    steps.push(newStep);
  }
  return steps;
});

Cypress.Commands.add("interceptGetRandomOnboarding",(steps)=>{
  return cy.intercept(
    {
      method: "GET",
      url: "http://localhost:3000/api/onboarding",
    },
    {
      steps: steps
    }
  );
});

Cypress.Commands.add("createAccount", () => {
  cy.get("input[name=username]").type("test");
  cy.get("input[name=email]").type("test@test.com");
  cy.get("input[name=password]").type("password");
  cy.get("input[name=confirmPassword]").type("password");
  cy.contains("button", "Create").click();
});

Cypress.Commands.add("visitFormPage", () => {
  cy.interceptRegister();
  cy.interceptGetOnboarding();

  cy.visitPath("");
  cy.createAccount();
});
