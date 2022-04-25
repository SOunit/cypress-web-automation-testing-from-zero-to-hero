import { onDatepickerPage } from '../support/page_objects/datePickerPage';
import { onFormLayoutPage } from '../support/page_objects/formLayoutsPage';
import { navigateTo } from '../support/page_objects/navigationPage';
import { onSmartTablePage } from '../support/page_objects/smartTablePage';

describe('Test with Page Objects', () => {
  beforeEach('open application', () => {
    cy.openHomePage();
  });

  it('verify navigation across the pages', () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.sampleTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });

  it.only('should submit inline and basic form and select tomorrow date in the calendar', () => {
    // 1. form layout page
    navigateTo.formLayoutPage();
    onFormLayoutPage.submitInlineFormWithNameAndEmail('Jack', 'test@test.com');
    onFormLayoutPage.submitBasicFormWithEmailAndPassword(
      'test@test.com',
      'password'
    );

    // 2. date picker page
    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(1);
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);

    // 3. smart table page
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName('Jack', 'Pearson');
    onSmartTablePage.updateAgeByFirstName('Jack', '38');
    onSmartTablePage.deleteRowByIndex(1);
  });
});
