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

  it('then and wrap methods', () => {
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

  it('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // 1
    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')
      .should('have.class', 'label')
      .and('have.text', 'Email address');

    // 2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal('Email address');
      expect(label).to.have.class('label');
      expect(label).to.have.text('Email address');
    });

    // 3
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Email address');
      });

    // 4
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // 4.1
      // .should('contain', 'checked');
      // 4.2
      .then((classValue) => {
        expect(classValue).to.contain('checked');
      });
  });

  it.only('assert property', () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDate = date.getDate();
      // let futureMonth = date.getMonth();
      let futureMonth = date.toLocaleString('default', { month: 'short' });
      let dateAssert =
        futureMonth + ' ' + futureDate + ', ' + date.getFullYear();

      cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            // click next month
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDate)
              .click();
          }
        });

      return dateAssert;
    }

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click();
        const dateAssert = selectDayFromCurrent(30);
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
        cy.wrap(input).should('have.value', dateAssert);
      });
  });

  it('radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should('be.checked');

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).eq(0).should('not.be.checked');

        cy.wrap(radioButtons).eq(2).should('be.disabled');
      });
  });

  it('check boxes', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    // cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(0).check({ force: true });
  });

  it('lists and dropdown', () => {
    cy.visit('/');

    // 1st
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should(
    //   'have.css',
    //   'background-color',
    //   'rgb(34, 43, 69)'
    // );

    // 2nd
    cy.get('nav nb-select').then((dropdown) => {
      cy.wrap(dropdown).click();

      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: 'rgb(255, 255, 255)',
          Dark: 'rgb(34, 43, 69)',
          Cosmic: 'rgb(50, 50, 89)',
          Corporate: 'rgb(255, 255, 255)',
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should(
          'have.css',
          'background-color',
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it('web tables', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    // 1st
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then((tableRow) => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
      });

    // 2nd
    cy.get('thead').find('.nb-plus').click();
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Jack');
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Pearson');
        cy.wrap(tableRow).find('.nb-checkmark').click();
      });
    cy.get('tbody tr')
      .first()
      .find('td')
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Jack');
        cy.wrap(tableColumns).eq(3).should('contain', 'Pearson');
      });

    // 3rd
    const ages = [20, 30, 40, 200];
    cy.wrap(ages).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get('tbody tr').each((tableRow) => {
        if (age === 200) {
          cy.wrap(tableRow).should('contain', 'No data found');
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age);
        }
      });
    });
  });

  it('tooltip', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Tooltip').click();

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip');
  });

  it('dialog box', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    // 1. not good approach
    // cy.get('tbody tr').first().find('.nb-trash').click();
    // // because never run test if on parameter do not match
    // cy.on('window:confirm', (confirm) => {
    //   expect(confirm).to.equal('Are you sure you want to delete?');
    // });

    // 2. better approach, this assertion can create error if fail
    // const stub = cy.stub();
    // cy.on('window:confirm', stub);
    // cy.get('tbody tr')
    //   .first()
    //   .find('.nb-trash')
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith(
    //       'Are you sure you want to delete?'
    //     );
    //   });

    // 3. prevent delete
    cy.get('tbody tr').first().find('.nb-trash').click();
    // because never run test if on parameter do not match
    cy.on('window:confirm', (confirm) => {
      return false;
    });
  });
});
