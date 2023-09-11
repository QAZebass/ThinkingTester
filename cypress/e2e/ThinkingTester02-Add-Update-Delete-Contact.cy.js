import { apis } from "../support/APIs/APIs"
import { faker } from "@faker-js/faker"
import { contactlist } from "../support/ContactList"
import { contactInfo } from "../support/ContactList"
import { contactInformation, retrievedInformation } from "../support/ContactList"
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
        contactlist.writeFirstName(contactInfo.firstname)
        contactlist.writeLastName(contactInfo.lastname)
        contactlist.writeDateofBirth(contactInfo.BirthDate)
        contactlist.writeEmail(contactInfo.email)
        contactlist.writePhone(contactInfo.phone)
        contactlist.writeStreetAdress1(contactInfo.address1)
        contactlist.writeStreetAdress2(contactInfo.address2)
        contactlist.writeCity(contactInfo.city)
        contactlist.writeState(contactInfo.state)
        contactlist.writeZIPCode(contactInfo.zip)
        contactlist.writeCountry(contactInfo.country)
        contactlist.clickSubmit()
        cy.wait('@request').then((response)=>{
            expect(response.response.statusCode).equal(201)})
        cy.wait(1000)
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
