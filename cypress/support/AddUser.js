class AddUser{
    get={
        addUserTite:()=> cy.get('h1'),
        header:()=> cy.get('p').first(),
        firstNameInput:()=> cy.get('[id="firstName"]'),
        lastNameInput:()=> cy.get('[id="lastName"]'),
        emailInput:()=> cy.get('[id="email"]'),
        passwordInput:()=> cy.get('[id="password"]'),
        submitButton:()=> cy.get('[id="submit"]'),
        cancelButton:()=> cy.get('[id="cancel"]')
    }
    writeFirstName(name){
        this.get.firstNameInput().invoke('attr', 'placeholder').should('equal', 'First Name')
        this.get.firstNameInput().type(name)
    }
    writeLastName(lastname){
        this.get.lastNameInput().invoke('attr', 'placeholder').should('equal', 'Last Name')
        this.get.lastNameInput().type(lastname)
    }
    writeEmail(email){
        this.get.emailInput().invoke('attr', 'placeholder').should('equal', 'Email')
        this.get.emailInput().type(email)
    }
    writePassword(password){
        this.get.passwordInput().invoke('attr', 'placeholder').should('equal', 'Password')
        this.get.passwordInput().type(password)
    }
    clickSubmitButton(){
        this.get.submitButton().should('have.text', 'Submit')
        this.get.submitButton().click()
    }
    addingUser(firstname, lastname,email, password){
        this.writeFirstName(firstname)
        this.writeLastName(lastname)
        this.writeEmail(email)
        this.writePassword(password)
        this.clickSubmitButton()
    }
}
export const adduser = new AddUser()
