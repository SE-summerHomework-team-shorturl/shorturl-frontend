describe('Add Shouturl', () => {
    it('successfully loads', () => {
        cy.login("Me","123456")
        cy.get('.ant-input.ant-input-lg').should('be.visible')
        cy.get('.ant-typography').should('not.be.visible')
        cy.get('.ant-input.ant-input-lg').type("https://ipads.se.sjtu.edu.cn/courses/ics/")
        cy.get('.ant-input-group-addon > .ant-btn').click()
        cy.get('.ant-typography').should('be.visible')
        cy.get('.ant-typography').click()
    })
})
