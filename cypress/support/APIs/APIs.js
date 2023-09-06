class APIs{
    endpoint={
        createUser: 'https://thinking-tester-contact-list.herokuapp.com/users',
        deleteUser: 'https://thinking-tester-contact-list.herokuapp.com/users/me'
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
    deleteUser(token){
        return cy.request({
            'method': 'DELETE',
            'url': this.endpoint.deleteUser,
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            return response
        })
    }
}
export const apis = new APIs()