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
    cy.get('#edit-flat').click()

    // Check whether the flat information edit page has a flat rules section
    cy.contains('Flat Rules')
    cy.contains('Smoking')
    cy.contains('Pets')

    // // Log out and return to the home page
    // cy.visit('/logout')
    // cy.visit('/')

    // // Click the sign in button to go to the log in page
    // cy.get('#sign-in').click()

    // // Enter log in details for a flatee account then sign in
    // cy.get('#username').type('billy2')
    // cy.get('#password').type('billy2')
    // cy.get('#sign-in').click()

    // // Log out and return to the home page
    // cy.visit('/logout')
    // cy.visit('/')
  })
})