# Cypress E2E Testing Setup

This document describes the Cypress E2E testing setup for the Hayoma Dairy Products frontend application.

## Installation

Cypress and related dependencies are already installed. If you need to reinstall, run:

```bash
npm install --legacy-peer-deps --save-dev cypress @cypress/schematic mochawesome mochawesome-merge mochawesome-report-generator
```

## Configuration

The Cypress configuration is defined in `cypress.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720 (desktop default)
- **Reporter**: Mochawesome (generates HTML and JSON reports)
- **Video Recording**: Enabled (saved in `cypress/videos`)
- **Screenshots**: Enabled on test failure (saved in `cypress/screenshots`)
- **Reports**: Saved in `cypress/reports`

## Test Files

Test files are located in `cypress/e2e/`:

- **login.cy.ts** - Login page functionality tests
- **home.cy.ts** - Home page rendering and responsive design tests
- **navigation.cy.ts** - Navigation and routing tests
- **ui-components.cy.ts** - UI components and accessibility tests

## Custom Commands

Custom Cypress commands are defined in `cypress/support/commands.ts`:

- `cy.login(email, password)` - Login with email and password
- `cy.logout()` - Logout from the application
- `cy.navigateTo(path)` - Navigate to a specific path

### Example Usage:

```javascript
describe('Dashboard Tests', () => {
  it('should display dashboard after login', () => {
    cy.login('user@example.com', 'password123');
    cy.url().should('include', '/dashboard');
  });
});
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner where you can:
- View all test files
- Run individual tests
- Run all tests
- Watch tests in real-time
- Debug tests with browser DevTools

### Run All Tests (Headless Mode)

```bash
npm run test:e2e
```

This runs all tests in headless mode and generates Mochawesome reports.

### Run Tests with Specific Browser

```bash
# Chrome
npm run cypress:headless

# Firefox
npm run cypress:firefox

# Edge
npm run cypress:edge
```

### Run Tests in Debug Mode

```bash
npm run test:e2e:debug
```

This runs tests in headed mode with the Cypress browser staying open after tests complete.

### Generate Combined Report

```bash
npm run test:reports
```

This merges all Mochawesome JSON reports into a single HTML report at `cypress/reports/report.html`.

### Run Everything (Tests + Reports)

```bash
npm run test:all
```

## Report Generation

After running tests with `npm run test:e2e`, reports are generated in:

- **JSON**: `cypress/reports/mochawesome*.json` (raw test data)
- **HTML**: `cypress/reports/report.html` (formatted test report)

To view the HTML report:

1. Open `cypress/reports/report.html` in your browser
2. Or use a local server:

```bash
npx http-server cypress/reports
```

Then navigate to `http://localhost:8080/report.html`.

## Test Structure

Tests follow this structure:

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
    cy.visit('/page');
  });

  it('should do something', () => {
    // Test implementation
    cy.get('selector').should('be.visible');
  });
});
```

## Best Practices

1. **Use data attributes**: Add `data-cy` attributes to elements for reliable selection:
   ```jsx
   <button data-cy="submit-btn">Submit</button>
   ```
   ```javascript
   cy.get('[data-cy="submit-btn"]').click();
   ```

2. **Avoid hard waits**: Use Cypress built-in waiting:
   ```javascript
   // Good
   cy.get('element', { timeout: 10000 }).should('be.visible');
   
   // Avoid
   cy.wait(5000);
   ```

3. **Keep tests focused**: Each test should verify one main behavior.

4. **Use fixtures for test data**: Reusable test data in `cypress/fixtures/`.

5. **Clean up after tests**: Use `afterEach()` hooks for cleanup.

## Troubleshooting

### Tests Timeout

- Increase timeout in test: `cy.get('element', { timeout: 15000 })`
- Check if application is running on `http://localhost:3000`
- Verify page load times in Network tab of browser DevTools

### "Element not found" Errors

- Use `cy.get()` selectors correctly
- Add `data-cy` attributes to elements you want to test
- Use `{ force: true }` only if necessary: `cy.click({ force: true })`

### Video/Screenshot Issues

- Ensure `cypress/videos` and `cypress/screenshots` folders exist
- Check disk space availability
- Disable videos if not needed in `cypress.config.ts`

### Report Generation Fails

- Delete old reports: `rm -rf cypress/reports`
- Reinstall mochawesome: `npm install --legacy-peer-deps mochawesome-report-generator`
- Check file permissions in `cypress/reports` directory

## Continuous Integration

To run tests in CI/CD pipelines (GitHub Actions, GitLab CI, etc.):

```bash
npm run cypress:headless -- --ci
```

Or add to your CI configuration:

```yaml
- name: Run E2E Tests
  run: npm run test:e2e

- name: Generate Reports
  if: always()
  run: npm run test:reports

- name: Upload Reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: cypress-reports
    path: cypress/reports/
```

## Adding More Tests

To add new tests:

1. Create a new file in `cypress/e2e/` with `.cy.ts` extension
2. Use the existing test files as templates
3. Run `npm run cypress:open` to verify your tests
4. Commit and push changes

Example:

```bash
# Create new test file
touch cypress/e2e/dashboard.cy.ts
```

Then add tests:

```javascript
describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password');
  });

  it('should display user info', () => {
    cy.get('[data-cy="user-info"]').should('be.visible');
  });
});
```

## Resources

- [Cypress Official Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Mochawesome Reporter](https://adamgruber.github.io/mochawesome/)

## Support

For issues or questions about the Cypress setup, refer to:

- Cypress Discord: https://discord.gg/cypress
- Cypress GitHub Issues: https://github.com/cypress-io/cypress/issues
