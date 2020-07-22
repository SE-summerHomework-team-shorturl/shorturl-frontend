describe('Register', () => {
    it('successfully loads', () => {
        cy.visit('/')
        cy.get('a').click()
        cy.get('#register_email').type("Test@qq.com")
        cy.get('#register_username').type("Test")
        cy.get('#register_password').type("123456")
        cy.get('#register_confirm').type("123456")
        cy.get('.ant-btn').click()
        cy.get('#normal_login').should("exist")
    })
})
