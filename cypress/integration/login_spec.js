describe('login', () => {
    it('should redirect user to login', () => {
        //Try go to main page
        cy.visit('/');
        //Should be redirected to landing 
        //(GIVEN that a user doesn't have a current session, WHEN they open the app, THEN they are directed to login.)
        cy.location('pathname').should('equal', '/landing')

        //Should have login and register options
        cy.findByRole('button', {  name: /sign in/i}).click();
        cy.location('pathname').should('equal', '/login')

        //Should have username and password fields
        // cy.contains('Hi Test!')

        //Should have forgot(future)
        // cy.contains('a', 'rememberme')

        //Should have redirect to register page
        // cy.contains('Hi Test!')

        //Enter Incorrect Username and Password
        cy.get('[name=username]').type('incorrect')
        cy.get('[name=password]').type('incorrect')
        cy.findByRole('button', {  name: /sign in/i}).click();

        // Clean up
        cy.get('[name=username]').clear()
        cy.get('[name=password]').clear()

        //Enter Correct Username and password
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.findByRole('button', {  name: /sign in/i}).click();

        // Should be directed Home
        // cy.location('pathname').should('equal', '/')
        cy.contains('Hello System Admin')
        .should('be.visible')
        // .then(() => {
        // /* global window */
        //   const userString = window.localStorage.getItem('user')
    
        //   expect(userString).to.be.a('string')
        //   const user = JSON.parse(userString)
    
        //   expect(user).to.be.an('object')
        //   expect(user).to.have.keys([
        //     'id',
        //     'username',
        //     'firstName',
        //     'lastName',
        //   ])
    
        //   expect(user.token).to.be.a('string')
        // })
        // //Password should be hidden
        //GIVEN that a user has selected the password field, WHEN they enter characters into the field, THEN each character is hidden/ represented by a centre dot. 

        //GIVEN that a user has an active session, WHEN they refresh the app, THEN they don't have to login again.

        //GIVEN that a user has an active session, WHEN they open a new tab in the same windowed connection (browser), THEN they don't have to login again.

        //Timeout - GIVEN that a user has an active session, WHEN ten days have passed since the session's login date and time, THEN the session becomes inactive.
    })
})