describe('testing',()=>{
    it('test',()=>{
        cy.request({
            'method': 'POST',
            'url': 'https://thinking-tester-contact-list.herokuapp.com/users',
            failOnStatusCode: false,
            body:{
                "firstName": "Test",
                "lastName": "User",
                "email": "testingg@fake.com",
                "password": "myPassword"
            }   
        }).then(response=>{
            cy.log(response)
        })
    })
})