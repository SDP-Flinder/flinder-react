describe('As a flatee, I want to be able to filter flats based on preferences, so that I dont need to look through flats that do/dont allow smoking, pets, etc', () => {
    it('Logs in as a flatee account, access filter drawer, makes changes, checks that the cards are relected properly', () => {
      // Visit the base URL - http://localhost:3000 to load the app
      cy.visit('/')
  
      // Click the sign in button to go to the log in page
      cy.get('#sign-in').click()
  
      // Enter log in details for a flatee account then sign in
      cy.get('#username').type('prunella123')
      cy.get('#password').type('123456789')
      cy.get('#sign-in').click();

      // Open the drawer
      cy.get('.filterDrawer').click();

      // Tick the smoker allowed box and the pets allowed box; submit form
      cy.get('.smoker').click();
      cy.get('.pets').click();
      cy.get('.filter').click();

      // Check that the Chips exist
      cy.get('#see-more').click({force: true});
      cy.get('#view-info').click({force: true});
      cy.get('.petsLabel').contains('Pets');
      cy.get('.smokingLabel').contains('Smoking');
    })
  })