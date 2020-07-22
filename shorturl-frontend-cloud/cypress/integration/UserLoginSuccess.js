describe('User Login Success', () => {
    it('successfully loads', () => {
        cy.login("Me","123456")
        cy.get('.ant-input.ant-input-lg').should('be.visible')
        cy.window().its('sessionStorage')
            .invoke("getItem","isLogin")
            .should('exist')
        cy.get(':nth-child(6) > a').should('not.exist')
    })
})
