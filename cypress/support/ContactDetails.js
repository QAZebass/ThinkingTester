export const fields=[]
class ContactDetails{
    get={
        editContactButton:()=> cy.get('[id="edit-contact"]'),
        contactFields:()=> cy.get('form p label'),
        labels:()=> cy.get('label')
    }
    clickEditContactButton(){
        this.get.editContactButton().should('have.text','Edit Contact').click()
    }
    editOneRandomContactField(){
        this.get.contactFields().each(field=>{
                fields.push(field.text().trim().replace(':',''))
        }).then(()=>{
            cy.log(fields)
        })
    }
}
export const contactdetails = new ContactDetails()