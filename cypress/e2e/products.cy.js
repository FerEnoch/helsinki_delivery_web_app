/// <reference types="Cypress" />

const { describe, it } = require('mocha')

describe('Productos', () => {
  it('Should show all products from server', () => {
    cy.visit('/')
  })
})
