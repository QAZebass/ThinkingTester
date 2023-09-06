import { faker } from '@faker-js/faker'
import { apis } from '../support/APIs/APIs'
import { login } from '../support/LOGIN'
import data from '../fixtures/staticData.json'
const firstname = faker.person.firstName()
const lastname = faker.person.lastName()
const mail = faker.internet.email()
const password = faker.internet.password()

describe('ThinkingTester01 | Log in',()=>{
   
    before('Creating User',()=>{
        cy.visit('/')
        apis.createUser(firstname, lastname, mail, password).then((response)=>{
            expect(response.status).equal(201)
            expect(response.statusText).equal('Created')
            Cypress.env('token', response.body.token)
            Cypress.env('id', response.body.user._id)
        })
    })
    after('Deleting User',()=>{
        apis.deleteUser(Cypress.env('token')).then((response)=>{
            expect(response.status).equal(200)
            expect(response.statusText).equal('OK')
        })
    })
    it('ThinkTester01 | TC1: Validate that the user can log into the Thinking Tester contact list app',()=>{
        cy.intercept('GET', data.API.endpoints.fetchContacts).as('request')
        login.get.loginTitle().should('have.text', data.LoginTitle)
        login.writeEmail(mail)
        login.writePassword(password)
        login.clickSubmit()
        cy.wait('@request').then((response)=>{
            expect(response.response.statusCode).equal(200)
            expect(response.state).equal(data.API.response.OKstatus)
        })
    })
})