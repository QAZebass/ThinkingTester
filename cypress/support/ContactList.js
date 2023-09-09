class ContactList{
    get={
        logOutButton:()=> cy.get('[id="logout"]')
    }
    clickLogOut(){
        this.get.logOutButton().should('have.text', 'Logout').click()
    }
}
export const contactlist = new ContactList()