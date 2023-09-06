class Login{
    get={
        loginTitle: ()=> cy.get('[class="main-content"] p').first(),
        emailInput: ()=> cy.get('[id="email"]'),
        passwordInput:()=> cy.get('[id="password"]'),
        submitButton:()=> cy.get('[id="submit"]')
    }
    writeEmail(email){
        this.get.emailInput().invoke('attr', 'placeholder').should('equal', 'Email')
        this.get.emailInput().type(email)
    }
    writePassword(password){
        this.get.passwordInput().invoke('attr', 'placeholder').should('equal', 'Password')
        this.get.passwordInput().type(password)
    }
    clickSubmit(){
        this.get.submitButton().should('have.text', 'Submit').click()
    }
}
export const login = new Login()