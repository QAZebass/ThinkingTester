
const newContactInfoArray=[]
import { faker } from "@faker-js/faker";
let birthdate;
function getRandomDate() {
    const year = Math.floor(Math.random() * (2023 - 1960 + 1)) + 1960; 
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 31) + 1).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
export const contactInfo={
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    dateofbirth: birthdate= getRandomDate(),
    email: faker.internet.email(),
    phone: faker.phone.number('##########'),
    streetaddress1: faker.location.streetAddress(),
    streetaddress2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    stateorprovince : faker.location.state(),
    postalcode : faker.location.zipCode(),
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
        for (const key in contactInfo){
            newContactInfoArray.push([key, contactInfo[key]])
        }
        this.get.contactFields().then(field=>{
            const randomNumber = Cypress._.random(0, field.length -1)
            this.get.inputContainer().eq(randomNumber).within(()=>{
                this.get.input().clear()
            })
            this.get.inputContainer().eq(randomNumber).within(()=>{
                this.get.input().type(newContactInfoArray[randomNumber][1])
        })
        })
    }
}

export const contactdetails = new ContactDetails()