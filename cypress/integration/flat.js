describe('sign up as flat', () => {
    it('user sign up as a flat', () => {
        //SIGN UP
        cy.visit('http://localhost:3000/sign-up');

                //Username already exists in the database
        cy.findByPlaceholderText(/enter your username/i).type('danieltran', { delay: 100 });

                //Password too short
        cy.findByPlaceholderText(/enter your password/i).type('123', { delay: 100 });

                //Invalid email input
        cy.findByPlaceholderText(/enter your email/i).type('cypressflat', { delay: 100 });

        cy.findByRole('radio', {
            name: /a flatmate/i
        }).check();
        cy.findByRole('button', {
            name: /next/i
        }).click()
               //All the inputs are valid 
        cy.findByPlaceholderText(/enter your password/i).type('123456789', { delay: 100 });
        cy.findByPlaceholderText(/enter your email/i).type('@gmail.com', { delay: 100 });
        cy.findByRole('button', {
            name: /next/i
        }).click()

        cy.findByPlaceholderText(/enter your username/i).clear();
        cy.findByPlaceholderText(/enter your username/i).type('danieltran123', { delay: 100 });
        cy.findByRole('button', {
            name: /next/i
        }).click()


        //PERSONAL INFORMATION

        //User enters invalid names
        cy.findByPlaceholderText(/enter your first name..../i).type('12', { delay: 100 });
        cy.findByPlaceholderText(/Enter your last name..../i).type('3', { delay: 100 });   
        cy.findByRole('button', {
            name: /next/i
        }).click();

        //Clear the names
        cy.findByPlaceholderText(/enter your first name..../i).clear();
        cy.findByPlaceholderText(/enter your last name..../i).clear();

        //Valid names
        cy.findByPlaceholderText(/enter your first name..../i).type('daniel', { delay: 100 });
        cy.findByPlaceholderText(/Enter your last name..../i).type('tran', { delay: 100 });   
        cy.findByRole('button', {
            name: /next/i
        }).click();
        cy.get('#root > div > div > form > div:nth-child(11) > div').click();
        //Valid DOB (15+ only)
        for(let k =0; k < 20; k ++){
            cy.findByRole('button', {
                name: /«/i
            }).click();
        }

        cy.findByText(/13/i).click();

        cy.findByRole('button', {
            name: /next/i
        }).click();

        //ADDRESS

        //User enters an existing address
        cy.findByRole('combobox').type('53 cook street', { delay: 100 })
        .wait(2000)
        .type('{downarrow}', { delay: 100 })
        .type('{enter}', { delay: 100 })
        .wait(1000);
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(2000);

        cy.findByRole('button', {
            name: /clear/i
        }).click();

        cy.findByRole('combobox').type('52 cook street', { delay: 100 })
        .wait(2000)
        .type('{downarrow}', { delay: 100 })
        .type('{enter}', { delay: 100 }).wait(2000);
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(2000);

        //FLAT DESCRIPTION
        cy.findByRole('spinbutton', {
            name: /existing flatmate\(s\): description/i
        }).type('2');

        cy.findByRole('textbox').type('This is the cypress testing for flat sign up feature', {delay: 100});

        cy.findByRole('button', {
            name: /next/i
        }).click().wait(1000);

        //check information

        cy.findByPlaceholderText(/edit address/i).click().wait(1000);
        cy.findByRole('combobox').type('19 carlton gore', { delay: 100 })
        .wait(2000)
        .type('{downarrow}', { delay: 100 })
        .wait(1000)
        .type('{enter}', { delay: 100 })
        .wait(1000);
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(1000);
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(1000);

        //click submit
        //THIS WILL SUBMIT THE FORM
        // cy.findByRole('button', {
        //     name: /complete/i
        // })
    });

    it('user signs up as flat but they want to change to flatee', () => {

        cy.visit('http://localhost:3000/sign-up');

        cy.findByPlaceholderText(/enter your username/i).type('danieltran123', { delay: 100 });
        cy.findByPlaceholderText(/enter your password/i).type('123456', { delay: 100 });
        cy.findByPlaceholderText(/enter your email/i).type('cypressflatee@gmail.com', { delay: 100 });
        cy.findByRole('radio', {
            name: /a flatmate/i
        }).check();
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(1000);
        
        cy.findByRole('button', {
            name: /back/i
        }).click().wait(1000);
        cy.findByPlaceholderText(/enter your username/i).type('danieltran123', { delay: 100 });
        cy.findByPlaceholderText(/enter your password/i).type('123456', { delay: 100 });
        cy.findByPlaceholderText(/enter your email/i).type('cypressflatee@gmail.com', { delay: 100 });
        cy.get('#root > div > div > div:nth-child(2) > form > div > fieldset > div > label:nth-child(2)').click().wait(1000);
        cy.findByRole('button', {
            name: /next/i
        }).click().wait(1000);
    })
})