Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName')
        .type('NOME')
        .should('have.value', 'NOME')

    cy.get('#lastName')
        .type('SOBRENOME')
        .should('have.value', 'SOBRENOME')

    cy.get('#email')
        .type('EMAIL@EMAIL.COM')
        .should('have.value', 'EMAIL@EMAIL.COM')

    cy.get('#open-text-area')
        .type('teste')
        .should('have.value', 'teste')

    cy.contains('button','Enviar').click();
});
