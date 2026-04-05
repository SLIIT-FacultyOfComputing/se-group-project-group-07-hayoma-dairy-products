describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to login page from home', () => {
    cy.get('a').contains(/login|sign in/i).click({ force: true });
    cy.url().should('include', '/login');
  });

  it('should navigate to about page if exists', () => {
    cy.get('a').contains(/about/i).then(($link) => {
      if ($link.length > 0) {
        cy.wrap($link).click({ force: true });
        cy.url().should('include', '/about');
      }
    });
  });

  it('should navigate to contact page if exists', () => {
    cy.get('a').contains(/contact/i).then(($link) => {
      if ($link.length > 0) {
        cy.wrap($link).click({ force: true });
        cy.url().should('include', '/contact');
      }
    });
  });

  it('should have working back button navigation', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.go('back');
    cy.url().should('not.include', '/login');
  });

  it('should handle page not found gracefully', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    cy.get('body').should('be.visible');
  });

  it('should navigate using direct URL', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.visit('/');
    cy.url().should('not.include', '/login');
  });

  it('should maintain navigation on page refresh', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.reload();
    cy.url().should('include', '/login');
  });
});
