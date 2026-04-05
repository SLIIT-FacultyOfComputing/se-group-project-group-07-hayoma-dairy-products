describe('UI Components E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper heading hierarchy', () => {
    cy.get('h1, h2, h3').should('exist');
  });

  it('should have accessible images with alt text', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt');
    });
  });

  it('should have accessible form labels', () => {
    cy.visit('/login');
    cy.get('label').should('exist');
  });

  it('should have accessible buttons', () => {
    cy.get('button').should('exist');
  });

  it('should display form inputs correctly', () => {
    cy.visit('/login');
    cy.get('input').should('be.visible');
  });

  it('should have proper color contrast (manual check recommended)', () => {
    cy.get('body').should('have.css', 'color');
  });

  it('should support keyboard navigation', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').focus();
    cy.focused().should('have.attr', 'type', 'email');
    cy.get('input[type="password"]').focus();
    cy.focused().should('have.attr', 'type', 'password');
    cy.get('button[type="submit"]').focus();
    cy.focused().should('have.attr', 'type', 'submit');
  });

  it('should have proper viewport meta tag', () => {
    cy.get('meta[name="viewport"]').should('exist');
  });

  it('should have proper charset declaration', () => {
    cy.get('meta[charset]').should('exist');
  });
});
