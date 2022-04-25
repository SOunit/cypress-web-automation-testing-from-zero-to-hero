/// <reference types="cypress" />

describe('Test with backend', () => {
  beforeEach('login to the app', () => {
    // 1st, not recommended, deprecated
    // cy.server();
    // cy.route('GET', '**/tags', 'fixture:tags.json');

    // 2nd, not bad
    // cy.intercept('GET', '**/tags', { fixture: 'tags.json' });

    // 3rd, with pathMatcher object
    cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' });

    cy.loginToApplication();
  });

  it.skip('verify correct request and response', () => {
    // cy.server();
    // cy.route('POST', '**/articles').as('postArticles');
    cy.intercept('POST', '**/api.realworld.io/api/articles').as('postArticles');

    cy.contains('New Article').click();
    cy.get('[formcontrolname="title"]').type(
      `This is a title ${Math.random()}`
    );
    cy.get('[formcontrolname="description"]').type('This is a description');
    cy.get('[formcontrolname="body"]').type('This is a body');
    cy.contains('Publish Article').click();

    cy.wait('@postArticles');
    cy.get('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal('This is a body');
      expect(xhr.response.body.article.description).to.equal(
        'This is a description'
      );
    });
  });

  it.skip('should gave tags with routing objects', () => {
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing');
  });

  it.skip('verify global feed likes count', () => {
    // cy.route('GET', '**/articles/feed*', '{"articles":[],"articlesCount":0}');
    // cy.route('GET', '**/articles*', 'fixture:articles.json');
    cy.intercept('GET', '**/articles/feed*', {
      articles: [],
      articlesCount: 0,
    });
    cy.intercept('GET', '**/articles*', { fixture: 'articles.json' });

    cy.contains('Global Feed').click();
    cy.get('app-article-list button').then((listOfButtons) => {
      expect(listOfButtons[0]).to.contain(1);
      expect(listOfButtons[1]).to.contain(5);
    });

    cy.fixture('articles').then((file) => {
      const articleLink = file.articles[1].slug;
      // cy.route('POST', `**/articles/${articleLink}/favorite`, file);
      cy.intercept('POST', `**/articles/${articleLink}/favorite`, file);
    });

    // count up happens inside UI, so no need to post data, mock server is ok
    cy.get('app-article-list button').eq(1).click().should('contain', 6);
  });

  it('intercepting and modifying the request and response', () => {
    // 1. modify request
    // cy.intercept('POST', '**/api.realworld.io/api/articles', (req) => {
    //   req.body.article.description = 'This is a description 2';
    // }).as('postArticles');

    // 2. modify response
    cy.intercept('POST', '**/api.realworld.io/api/articles', (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal('This is a description');
        res.body.article.description = 'This is a description 2';
      });
    }).as('postArticles');

    cy.contains('New Article').click();
    cy.get('[formcontrolname="title"]').type(
      `This is a title ${Math.random()}`
    );
    cy.get('[formcontrolname="description"]').type('This is a description');
    cy.get('[formcontrolname="body"]').type('This is a body');
    cy.contains('Publish Article').click();

    cy.wait('@postArticles');
    cy.get('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal('This is a body');
      expect(xhr.response.body.article.description).to.equal(
        'This is a description 2'
      );
    });
  });
});
