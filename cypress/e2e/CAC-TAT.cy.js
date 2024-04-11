// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function () {
        cy.title('').should('eq', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche todos os campos obrigatórios e envia o formulário', () => {

        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste,teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste';

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
            .type(longText)
            .should('have.value', longText, { delay: 0 })

        cy.get('button[type = "submit"]').click();

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
            .type('NOME')
            .should('have.value', 'NOME')

        cy.get('#lastName')
            .type('SOBRENOME')
            .should('have.value', 'SOBRENOME')

        cy.get('#email')
            .type('EMAIL')
            .should('have.value', 'EMAIL')

        cy.get('#open-text-area')
            .type('TESTE')
            .should('have.value', 'TESTE')

        cy.get('button[type = "submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('campo telefone continua vazio ao inserir um valor não-numérico', () => {

        cy.get('#phone')
            .type('TESTE')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
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

        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')

        cy.get('button[type = "submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('NOME')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('SOBRENOME')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('EMAIL')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('TESTE')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.get('button[type = "submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu value', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu value', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    // Simula como se estivesse "arrastando" o arquivo
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target')
        .click()
        cy.contains('CAC TAT - Política de privacidade')
        .should('be.visible')
    });
})