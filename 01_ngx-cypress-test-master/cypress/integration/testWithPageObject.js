import { navigateTo } from '../support/page_objects/navigationpage';

describe('Test with Page Objects', () => {
  beforeEach('open application', () => {
    cy.visit('/');
  });

  it('verify navigation across the pages', () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.sampleTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });
});
