/// <reference types="cypress" />;

describe('first', () => {
  it('first', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layout').click();

    // cypress uses jQuery search engine
    // by tag name
    cy.get('input');

    // by ID
    cy.get('#inputEmail');

    // by class name(by one class)
    cy.get('.input-full-width');

    // by attribute name
    cy.get('[placeholder]');

    // by attribute name and value
    cy.get('[placeholder="Email"]');

    // by class value(by all classes)
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]');

    // by two different attributes
    cy.get('[placeholder="Email"][type="email"]');

    // by tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    // most recommended way by cypress
    // most solid, no effect from framework
    cy.get('[data-cy="imputEmail1"]');
  });

  it.only('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layout').click();
  });
});
