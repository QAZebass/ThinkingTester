import { apis } from "../support/APIs/APIs"
import { faker } from "@faker-js/faker"
import { contactlist, retrievedInformation } from "../support/ContactList"
import data from "../fixtures/staticData.json"
const firstname = faker.person.firstName()
const lastname = faker.person.lastName()
const email = faker.internet.email()
const password = faker.internet.password()



let token; 
describe('ThinkingTester02-Add-Update-Delete-Contact',()=>{
    before('Creating User, Log in, access to add contacts',()=>{
        apis.createUser(firstname, lastname, email, password)
        cy.Login(email, password).then(()=>{
            token =Cypress.env('token')
        })
        cy.visit('/contactList')
    })
    after('Deleting User',()=>{
        apis.deleteUser(Cypress.env('token')).then((response)=>{
            expect(response.status).equal(200)
        })
    })
    it('TT02 |TC1: Validate that the user can add a contact in the Add Contact Page',()=>{
        cy.intercept('POST', data.API.endpoints.fetchContacts).as('request')
        cy.url().should('equal', data.URLs.contactList)
        contactlist.clickAddContact()
        contactlist.writeFirstName(contactlist.contactInfo.firstname)
        contactlist.writeLastName(contactlist.contactInfo.lastname)
        contactlist.writeDateofBirth(contactlist.contactInfo.BirthDate)
        contactlist.writeEmail(contactlist.contactInfo.email)
        contactlist.writePhone(contactlist.contactInfo.phone)
        contactlist.writeStreetAdress1(contactlist.contactInfo.address1)
        contactlist.writeStreetAdress2(contactlist.contactInfo.address2)
        contactlist.writeCity(contactlist.contactInfo.city)
        contactlist.writeState(contactlist.contactInfo.state)
        contactlist.writeZIPCode(contactlist.contactInfo.zip)
        contactlist.writeCountry(contactlist.contactInfo.country)
        contactlist.clickSubmit()
        cy.wait('@request').then((response)=>{
            expect(response.response.statusCode).equal(201)})
        cy.wait(2000)
        contactlist.getColumnInfo()
        cy.wrap(retrievedInformation).then(()=>{
            const keyWithSpaces = "City, State/Province, Postal Code"
            expect(retrievedInformation.Name).equal(`${contactInformation.firstname} ${contactInformation.lastname}`)
            expect(retrievedInformation.Birthdate).equal(contactInformation.birthDate)
            expect(retrievedInformation.Email).equal(contactInformation.email.toLowerCase())
            expect(retrievedInformation.Phone).equal(contactInformation.phoneNumber)
            expect(retrievedInformation.Address).equal(`${contactInformation.address1} ${contactInformation.address2}`)
            expect(retrievedInformation[keyWithSpaces]).equal(`${contactInformation.city} ${contactInformation.state} ${contactInformation.zipcode}`)
            expect(retrievedInformation.Country).equal(contactInformation.country)
        })
            
        

    })    
})
