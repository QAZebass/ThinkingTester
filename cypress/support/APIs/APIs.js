class APIs{
    endpoint={
        createUser: 'https://thinking-tester-contact-list.herokuapp.com/users',
        deleteUser: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
        logIn: 'https://thinking-tester-contact-list.herokuapp.com/users/login'
    }
    createUser(firstName, lastName, email, password){
        return cy.request({
            'method': 'POST',
            'url': this.endpoint.createUser,
            failOnStatusCode: false,
            body:{
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            }
        }).then((response)=>{
            return response
        })
    }
    logIn(email, password){
        return cy.request({
            'method': 'POST',
            'url': this.endpoint.logIn,
            'body':{
                "email": email,
                "password": password
            }
        }).then((response)=>{
            return response
        })
    }
    deleteUser(token){
        return cy.request({
            'method': 'DELETE',
            'url': this.endpoint.deleteUser,
            failOnStatusCode: false,
            'headers':{
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            return response
        })
    }
}
export const apis = new APIs()