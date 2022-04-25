/// <reference types="cypress" />

describe('JSON objects', () => {
  it('JSON objects', () => {
    cy.openHomePage();

    const simpleObject = { key: 'value' };
    const simpleArrayOfValues = ['one', 'two', 'three'];
    const arrayOfObjects = [
      { key: 'value' },
      { key: 'value' },
      { key: 'value' },
      { key: 'value' },
    ];
  });
});
