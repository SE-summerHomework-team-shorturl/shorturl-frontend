describe('Admin Login Success', () => {
    it('successfully loads', () => {
        cy.login("admin","123456")
        cy.get('.ant-input.ant-input-lg').should('be.visible')
        cy.window().its('sessionStorage')
            .invoke("getItem","isLogin")
            .should('exist')
        cy.get(':nth-child(6) > a').should('be.visible')
    })
})
