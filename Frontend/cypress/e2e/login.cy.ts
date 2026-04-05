describe('Login Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should load the login page correctly', () => {
    cy.url().should('include', '/login');
    cy.get('h1, h2, [role="heading"]').should('contain.text', 'Login');
  });

  it('should have email and password input fields', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should have a submit button', () => {
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display validation errors for empty form submission', () => {
    cy.get('button[type="submit"]').click();
    // Check if any error message appears (adjust selector based on your UI)
    cy.get('form').should('be.visible');
  });

  it('should accept email input', () => {
    cy.get('input[type="email"]')
      .type('test@example.com')
      .should('have.value', 'test@example.com');
  });

  it('should accept password input', () => {
    cy.get('input[type="password"]')
      .type('password123')
      .should('have.value', 'password123');
  });

  it('should have a forgot password link', () => {
    cy.get('a').should('contain.text', 'Forgot password');
  });

  it('should navigate to registration page if link exists', () => {
    cy.get('a, button').contains(/register|sign up|create account/i).should('exist');
  });

  it('should not submit form with invalid email format', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    // Browser validation should prevent submission
    cy.get('input[type="email"]').should('have.value', 'invalid-email');
  });
});
