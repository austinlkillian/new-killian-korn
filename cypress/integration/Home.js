describe('Cypress navigation working', () => {
    it('can navigate to the base url', () => {
        cy.visit('/')
    })
    it('can navigate to the add page', () => {
        cy.visit('/cart')
    })
    it('can navigate to the product 4 and add quantity', () => {
        cy.visit('/product/4')
        cy.get('button').eq(2).click()
    })
})