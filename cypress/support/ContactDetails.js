
const newContactInfoArray=[]
const oldContactInfoArray=[]
import { contactInfo } from "./ContactList";
import { faker } from "@faker-js/faker";
let birthdate;
function getRandomDate() {
    const year = Math.floor(Math.random() * (2023 - 1970 + 1)) + 1970; 
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 31) + 1).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
export const contactInfo2={
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    dateOfBirth: birthdate= getRandomDate(),
    email: faker.internet.email(),
    phone: faker.phone.number('##########'),
    streetAddress1: faker.location.streetAddress(),
    streetAddress2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    stateOrProvince : faker.location.state(),
    postalCode : faker.location.zipCode(),
    country : faker.location.country(),
}
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
        for (const key in contactInfo2, contactInfo){
            newContactInfoArray.push([key, contactInfo2[key]])
            oldContactInfoArray.push([key, contactInfo[key]])
        }
        return this.get.contactFields().then(field=>{
            const randomNumber = Cypress._.random(0, field.length -1)
            this.get.inputContainer().eq(randomNumber).within(()=>{
                this.get.input().clear()
                Cypress.env('randomNumber', randomNumber)
            })   
        }).then(()=>{
            this.get.inputContainer().eq(Cypress.env('randomNumber')).within(()=>{
                this.get.input().type(newContactInfoArray[Cypress.env('randomNumber')][1])
                cy.log(`**${oldContactInfoArray[Cypress.env('randomNumber')][0]} has been changed!**`)      
        }).then(()=>{
            return Cypress.env('oldInfo',oldContactInfoArray[Cypress.env('randomNumber')][1]), Cypress.env('newInfo',newContactInfoArray[Cypress.env('randomNumber')][1]) 
        })
        })
    }
}

export const contactdetails = new ContactDetails()