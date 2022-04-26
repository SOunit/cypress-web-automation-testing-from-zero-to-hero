// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToApplication', () => {
  // 1st. just login via login page
  // cy.visit('/login');
  // cy.get('[placeholder="Email"]').type('workbookwork7@gmail.com');
  // cy.get('[placeholder="Password"]').type('password');
  // cy.get('form').submit();

  // 2nd. fetch token and save to local storage for faster test
  const userCredentials = {
    user: {
      email: 'workbookwork7@gmail.com',
      password: 'password',
    },
  };

  cy.request(
    'POST',
    'https://api.realworld.io/api/users/login',
    userCredentials
  )
    .its('body')
    .then((body) => {
      const token = body.user.token;

      cy.visit('/', {
        onBeforeLoad: (window) => {
          window.localStorage.setItem('jwtToken', token);
        },
      });
    });
});
