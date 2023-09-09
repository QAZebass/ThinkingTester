import { faker } from '@faker-js/faker'
import { apis } from '../support/APIs/APIs'
import { login } from '../support/Login'
import { adduser } from '../support/AddUser'
import { contactlist } from '../support/ContactList'
import data from '../fixtures/staticData.json'
function firstName (){const firstname= faker.person.firstName(); return firstname} 
function lastName (){ const lastname= faker.person.lastName(); return lastname}
function email(){ const email = faker.internet.email(); return email}
function pass(){ const password= faker.internet.password(); return password}

describe('TT01 | Sign Up, Log In and Log Out',()=>{
    beforeEach('Precondition',()=>{
        cy.visit('/')
    })
    it('TT01 | TC1: Validate that the user can create a user with the "sign up" button',()=>{
        
        cy.intercept('POST', data.API.endpoints.createUser).as('request')
        login.clickSignUp()
        adduser.writeFirstName(firstName())
        adduser.writeLastName(lastName())
        adduser.writeEmail(email())
        adduser.writePassword(pass())
        adduser.clickSubmitButton()
        cy.wait('@request').then((response)=>{
            const token = response.response.body.token
            expect(response.response.statusCode).equal(201)
            apis.deleteUser(token).then((response)=>{
                expect(response.status).equal(200)
            })
        })
    })
    
    it('TT01 | TC2: Validate that the user can log into the Thinking Tester contact list app',()=>{
        const Firstname= firstName(), Lastname = lastName(), Email= email(), Pass= pass()
        apis.createUser(Firstname, Lastname, Email, Pass).then((response)=> {
            const token= response.body.token
            login.get.loginTitle().should('have.text', data.LoginTitle)
            login.writeEmail(Email)
            login.writePassword(Pass)
            login.clickSubmit()
            cy.url().should('equal', data.URLs.contactList)
            apis.deleteUser(token).then((response)=>{
                expect(response.status).equal(200)
            }) 
        })
    })
    it('TT01 | TC3: Validate that the user can log out',()=>{
        const Firstname= firstName(), Lastname = lastName(), Email= email(), Pass= pass()
        apis.createUser(Firstname, Lastname, Email, Pass)
        login.logginIn(Email, Pass )
        contactlist.clickLogOut()
        cy.url().should('equal', data.URLs.home)
        apis.logIn(Email, Pass).then((response)=>{
            const token = response.body.token
            apis.deleteUser(token).then(()=>{
                expect(response.status).equal(200)
            })
        })        
    })
})