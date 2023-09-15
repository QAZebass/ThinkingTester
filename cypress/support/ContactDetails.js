export const fields=[]
import { contactInfo } from "./ContactList"
const contactInfoArray=[]
class ContactDetails{
    get={
        editContactButton:()=> cy.get('[id="edit-contact"]'),
        contactFields:()=> cy.get('form p label'),
        inputContainer:()=> cy.get('form p'),
        input:()=> cy.get('input')
    }
    clickEditContactButton(){
        this.get.editContactButton().should('have.text','Edit Contact').click()
    }
    editOneRandomContactField(){
        this.get.contactFields().each(field=>{
                fields.push(field.text().trim().replace(':','').toLowerCase().split(' ').join(''))
        })

        for (const key in contactInfo){
            contactInfoArray.push([key, contactInfo[key]])
        }
        const arrayOfcontactInfo= Cypress._.map(contactInfoArray, keys =>{
            return keys[0].toLowerCase()
        })
        cy.log(arrayOfcontactInfo)
        cy.log(fields)
    
        this.get.contactFields().then(field=>{
            const randomNumber = Cypress._.random(0, field.length -1)
            if(fields[randomNumber]===arrayOfcontactInfo[randomNumber]){
                cy.log(fields[randomNumber])
                cy.log(arrayOfcontactInfo[randomNumber])
                this.get.inputContainer().eq(randomNumber).within(()=>{
                    this.get.input().clear()
                })
                this.get.inputContainer().eq(randomNumber).within(()=>{
                    this.get.input().type(contactInfo[arrayOfcontactInfo[randomNumber]])
                })
            } 
        })
    }
}

export const contactdetails = new ContactDetails()