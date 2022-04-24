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

  it('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layout').click();

    cy.get('[data-cy="signInButton"]');

    cy.contains('Sign in');

    cy.contains('[status="warning"]', 'Sign in');

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
  });

  it.only('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // want to avoid redundancy
    // 1st form
    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for=inputEmail1]')
    //   .should('contain', 'Email');

    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputPassword2"]')
    //   .should('contain', 'Password');

    // 2nd form
    // cy.contains('nb-card', 'Basic form')
    //   .find('[for=exampleInputEmail1]')
    //   .should('contain', 'Email');

    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputPassword1"]')
    //   .should('contain', 'Password');

    // selenium (not work in cypress)
    // const firstForm = cy.contains('nb-card', 'Using the Grid');
    // firstForm.find('[for=inputEmail1]').should('contain', 'Email');
    // firstForm.find('[for="inputPassword2"]').should('contain', 'Password');

    // const secondForm = cy.contains('nb-card', 'Basic form');
    // secondForm.find('[for=exampleInputEmail1]').should('contain', 'Email');
    // secondForm
    //   .find('[for="exampleInputPassword1"]')
    //   .should('contain', 'Password');

    // cypress style
    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      // firstForm come from jQuery

      // jQuery style
      const emailLabelFirst = firstForm.find('[for=inputEmail1]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      // jQuery style assertion
      expect(emailLabelFirst).to.equal('Email');
      expect(passwordLabelFirst).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordLabelSecond);

        // cypress style
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should('contain', 'Password');
      });
    });
  });
});
