// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Disable uncaught exception handling for cleaner test output
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  if (err.message.includes('hydration')) {
    return false;
  }
  if (err.message.includes('Next.js')) {
    return false;
  }
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  // we still want an uncaught exception to fail our tests
  // so we return true
  return true;
});