import { faker } from "@faker-js/faker"
export const contactInformation={}
export const columsInfo={}
export const retrievedInformation={}
const th = []
const td = []
let birthdate;
function getRandomDate() {
    const year = Math.floor(Math.random() * (2023 - 1960 + 1)) + 1960; 
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 31) + 1).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
export const contactInfo={
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
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
class ContactList{
    get={
        addContactButton:()=> cy.get('[id="add-contact"]'),
        logOutButton:()=> cy.get('[id="logout"]'),
        addConctactButton:()=> cy.get('[id="add-contact"]'),
        header:()=> cy.get('h1'),
        firstNameLabel:()=> cy.get('[for="firstName"]'),
        firstNameForm:()=> cy.get('[id="firstName"]'),
        lastNameLabel:()=> cy.get('[for="lastName"]'),
        lastNameForm:()=> cy.get('[id="lastName"]'),
        birthDateLabel:()=> cy.get('[for="birthdate"]'),
        birthDateForm:()=> cy.get('[id="birthdate"]'),
        emailLabel:()=> cy.get('[for="email"]'),
        emailForm:()=> cy.get('[id="email"]'),
        phoneLabel:()=> cy.get('[for="phone"]'),
        phoneForm:()=> cy.get('[id="phone"]'),
        street1Label:()=> cy.get('[for="street1"]'),
        street1Form:()=> cy.get('[id="street1"]'),
        street2Label:()=> cy.get('[for="street2"]'),
        street2Form:()=> cy.get('[id="street2"]'),
        cityLabel:()=> cy.get('[for="city"]'),
        cityForm:()=> cy.get('[id="city"]'),
        stateLabel:()=> cy.get('[for="stateProvince"]'),
        stateForm:()=> cy.get('[id="stateProvince"]'),
        postalCodelLabel:()=> cy.get('[for="postalCode"]'),
        postalCodeForm:()=> cy.get('[id="postalCode"]'),
        countryLabel:()=> cy.get('[for="country"]'),
        countryForm:()=> cy.get('[id="country"]'),
        submitButton:()=> cy.get('[id="submit"]'),
        columns:()=> cy.get('td:not([hidden])'),
        tableHeader:()=> cy.get('tr th')
    }
    clickLogOut(){
        this.get.logOutButton().should('have.text', 'Logout').click()
    }
    clickAddContact(){
        this.get.addConctactButton().click()
    }
    writeFirstName(firstname){
        this.get.firstNameLabel().should('have.text', ' * First Name:')
        this.get.firstNameForm().type(firstname)
        contactInformation.firstname = firstname
    }
    writeLastName(lastname){
        this.get.lastNameLabel().should('have.text', ' * Last Name:')
        this.get.lastNameForm().type(lastname)
        contactInformation.lastname = lastname
    }
    writeDateofBirth(dateOfBirth){
        this.get.birthDateLabel().should('have.text', ' Date of Birth:')
        this.get.birthDateForm().type(dateOfBirth)
        contactInformation.birthDate = dateOfBirth
    }
    writeEmail(email){
        this.get.emailLabel().should('have.text', ' Email:')
        this.get.emailForm().type(email)
        contactInformation.email = email
    }
    writePhone(phoneNumber){
        this.get.phoneLabel().should('have.text', ' Phone:')
        this.get.phoneForm().type(phoneNumber)
        contactInformation.phoneNumber = phoneNumber
    }
    writeStreetAdress1(address1){
        this.get.street1Label().should('have.text', ' Street Address 1:')
        this.get.street1Form().type(address1)
        contactInformation.address1 = address1
    }
    writeStreetAdress2(address2){
        this.get.street2Label().should('have.text', ' Street Address 2:')
        this.get.street2Form().type(address2)
        contactInformation.address2 = address2
    }
    writeCity(city){
        this.get.cityLabel().should('have.text', ' City:')
        this.get.cityForm().type(city)
        contactInformation.city = city
    }
    writeState(state){
        this.get.stateLabel().should('have.text', ' State or Province:')
        this.get.stateForm().type(state)
        contactInformation.state = state
    }
    writeZIPCode(zipcode){
        this.get.postalCodelLabel().should('have.text', ' Postal Code:')
        this.get.postalCodeForm().type(zipcode)
        contactInformation.zipcode = zipcode
    }
    writeCountry(country){
        this.get.countryLabel().should('have.text', ' Country:')
        this.get.countryForm().type(country)
        contactInformation.country = country
    }
    clickSubmit(){
        this.get.submitButton().should('have.text', 'Submit')
        this.get.submitButton().click()
    }
    getColumnInfo(){
        this.get.tableHeader().each((el)=>{
            cy.wrap(el).then(()=>{
                th.push(el.text())
            })
        })
        this.get.columns().each((el)=>{
            cy.wrap(el).then(()=>{
                td.push(el.text())
            })
        }).then(()=>{
            for(let i=0; i<=th.length-1; i++){
                retrievedInformation[th[i]]= td[i]
            }
        })      
    }
    clickAnyField(){
        this.get.columns().then(el=>{
            const randomtd=Cypress._.random(0, el.length-1)
            this.get.columns().eq(randomtd).click()
        })
    }
    addContact(firstname,lastname, dateOfBirth, email, phoneNumber,
        address1, address2, city, state, zipcode, country){
        this.clickAddContact()
        this.writeFirstName(firstname)
        this.writeLastName(lastname)
        this.writeDateofBirth(dateOfBirth)
        this.writeEmail(email)
        this.writePhone(phoneNumber)
        this.writeStreetAdress1(address1)
        this.writeStreetAdress2(address2)
        this.writeCity(city)
        this.writeState(state)
        this.writeZIPCode(zipcode)
        this.writeCountry(country)
        this.clickSubmit()
    }
}
export const contactlist = new ContactList()