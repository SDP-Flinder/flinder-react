import '@testing-library/cypress/add-commands';

describe('navigation bar', () => {
    it('should toggle between pages when the user signs in', () => {
        //Try go to main page
        cy.visit('/');

        //Should be redirected to landing 
        //(GIVEN that a user doesn't have a current session, WHEN they open the app, THEN they are directed to login.)
        cy.location('pathname').should('equal', '/landing');

        //The navigation bar should not be visible if the user hasn't signed in yet
        cy.get('#root > div:nth-child(3) > div').should('not.exist');
        
        //Should have login and register options
        cy.findByRole('button', {  name: /sign in/i}).click();
        cy.location('pathname').should('equal', '/login');

        //Sign in
        cy.get('[name=username]').type('billy1')
        cy.get('[name=password]').type('billy1')
        cy.findByRole('button', {  name: /sign in/i}).click();

        //The user should be at the home page
        cy.location('pathname').should('equal', '/');

        //Click the chat icon
        cy.findByRole('link', {name: /matches/i}).click();
        cy.location('pathname').should('equal', '/match');

        //Click the profile icon
        cy.findByRole('link', {name: /profile/i}).click();
        cy.location('pathname').should('equal', '/profile');
    })
})