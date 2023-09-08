import { faker } from '@faker-js/faker'
import { apis } from '../support/APIs/APIs'
import { login } from '../support/LOGIN'
import { adduser } from '../support/ADDUSER'
import data from '../fixtures/staticData.json'
const firstname = faker.person.firstName()
const lastname = faker.person.lastName()
const mail = faker.internet.email()
const password = faker.internet.password()

describe('ThinkingTester01 | Sign Up, Log In and Delete user',()=>{
   
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
describe('ThinkingTester01 | Sign Up, Log In and Delete user',()=>{
    before('Precondition',()=>{
        cy.visit('/')
    })
    it('ThinkingTester01 | TC2: Validate that the user can create a user with the "sign up" button',()=>{
        cy.intercept('POST', data.API.endpoints.createUser).as('request')
        login.clickSignUp()
        adduser.writeFirstName(faker.person.firstName())
        adduser.writeLastName(faker.person.lastName())
        adduser.writeEmail(faker.internet.email())
        adduser.writePassword(faker.internet.password())
        adduser.clickSubmitButton()
        cy.wait('@request').then((response)=>{
            expect(response.response.statusCode).equal(201)
            expect(response.state).equal(data.API.response.OKstatus)
        })
    })
})