describe('User Manage', () => {
    it('successfully loads', () => {
        cy.login("Me","123456")
        cy.get(':nth-child(4) > a').should('be.visible')
        cy.get(':nth-child(4) > a').click()
        cy.get('.ant-table').should('be.visible')
    })
})
