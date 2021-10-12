describe('As a flat, I want to be able to specify flat rules such as no smoking or pets', () => {
  it('Logs in as a flat account, navigates to the profile page, checks for flat rules, accesses the edit page, checks for flat rules', () => {
    // Visit the base URL - http://localhost:3000 to load the app
    cy.visit('/')

    // Click the sign in button to go to the log in page
    cy.get('#sign-in').click()

    // Enter log in details for a flat account then sign in
    cy.get('#username').type('billy10')
    cy.get('#password').type('billy10')
    cy.get('#sign-in').click()

    // Navigate to the profile page
    cy.get('#profile').click()

    // Check whether the profile page contains a flat rules section
    cy.contains('Flat Rules')
    cy.contains('Smoking')
    cy.contains('Pets')

    // Go to the page for editing flat information
    cy.get('#flat-info').click()

    // Check whether the flat information edit page has a flat rules section
    cy.contains('Flat Rules')
    cy.contains('Smoking')
    cy.contains('Pets')

    // Check whether the the edit checkboxes can be checked
    cy.get('#smoking').not('[disabled]')
      .check().should('be.checked')
    cy.get('#pets').not('[disabled]')
      .check().should('be.checked')

    // Save the changed rules and check they have been updated
    cy.get('#save').click()
    cy.get('#ok').click()
    cy.contains('Allowed')

    // Go to the page for editing flat information
    cy.get('#flat-info').click()

    // Check whether the flat information edit page has a flat rules section
    cy.contains('Flat Rules')
    cy.contains('Smoking')
    cy.contains('Pets')

    // Check whether the the edit checkboxes can be unchecked
    cy.get('#smoking').not('[disabled]')
      .uncheck().should('not.be.checked')
    cy.get('#pets').not('[disabled]')
      .uncheck().should('not.be.checked')

    // Save the changed rules and check they have been updated
    cy.get('#save').click()
    cy.get('#ok').click()
    cy.contains('Not allowed')
  })
})