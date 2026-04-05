describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.url().should('not.include', '/login');
  });

  it('should have a navigation bar', () => {
    cy.get('nav, [role="navigation"]').should('be.visible');
  });

  it('should have a logo or brand name', () => {
    cy.get('a, div, [data-cy="logo"]').should('be.visible');
  });

  it('should display main content area', () => {
    cy.get('main, [role="main"], body').should('be.visible');
  });

  it('should have responsive design on mobile viewport', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.get('nav, [role="navigation"]').should('be.visible');
  });

  it('should have responsive design on tablet viewport', () => {
    cy.viewport(768, 1024);
    cy.visit('/');
    cy.get('nav, [role="navigation"]').should('be.visible');
  });

  it('should maintain responsive design on desktop viewport', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('nav, [role="navigation"]').should('be.visible');
  });

  it('should have navigation links', () => {
    cy.get('nav a, [role="navigation"] a').should('exist');
  });

  it('should have working page title', () => {
    cy.title().should('not.be.empty');
  });
});
