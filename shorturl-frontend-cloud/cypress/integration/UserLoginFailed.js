describe('User Login Failed', () => {
    it('successfully loads', () => {
        cy.login("Me","wrong")
        cy.get('.ant-input.ant-input-lg').should('not.exist')
    })
})
