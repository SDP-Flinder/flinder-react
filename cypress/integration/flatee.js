describe('sign up as a flatee', () => {
    it('user signs up as a flatee', () => {
        //Create username
        cy.visit('http://localhost:3000/sign-up');
        cy.findByPlaceholderText(/enter your username/i).type('danieltran123', { delay: 100 });
        cy.findByPlaceholderText(/enter your password/i).type('123456', { delay: 100 });
        cy.findByPlaceholderText(/enter your email/i).type('cypressflatee@gmail.com', { delay: 100 });
        cy.get('#root > div > div > div:nth-child(2) > form > div > fieldset > div > label:nth-child(2)').click().wait(1000);
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(1000);

        //Fill in basic information
        cy.findByPlaceholderText(/enter your first name..../i).type('daniel', { delay: 100 });
        cy.findByPlaceholderText(/Enter your last name..../i).type('tran', { delay: 100 });   
        cy.get('#root > div > div > form > div:nth-child(11) > div').click();
        for(let k =0; k < 20; k ++){
            cy.findByRole('button', {
                name: /«/i
            }).click();
        }

        cy.findByText(/13/i).click();
        
        cy.findByRole('button', {
            name: /next/i
        }).click();

        //Select preferred areas

        cy.findByRole('combobox').select('Auckland');
        cy.findByRole('button', {
            name: /​/i
        }).click();

        cy.findByRole('option', {
            name: /freemans bay/i
        }).click();

        cy.findByRole('option', {
            name: /grey lynn/i
        }).click()
        .wait(1000)
        .type('{esc}');

        cy.findByRole('button', {
            name: /next/i
        }).click();


        //Select habits

        cy.findByRole('checkbox', {
            name: /having pet\(s\)/i
        }).click();

        cy.findByRole('combobox', {
            name: /from to/i
        }).wait(1000).select('100');
        cy.findByPlaceholderText('max').wait(2000).select('50');
        cy.findByRole('button', {
            name: /next/i
        }).click();
        cy.findByPlaceholderText('max').wait(2000).select('300').wait(2000);
        cy.findByRole('button', {
            name: /next/i
        }).click();

        //Check details
        //cy.findByText(/complete/i).click();
    })
})