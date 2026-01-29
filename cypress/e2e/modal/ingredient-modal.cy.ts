describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
  });

  it('should open in modal', () => {
    cy.contains('[data-cy="ingredient-item"]', 'Мини-салат Экзо-Плантаго')
      .scrollIntoView()
      .click();

    cy.get('[data-cy="ingredient-modal"]').should('be.visible'); //проверка, что отобразилось в модальном окне
  });

  it('should close modal on click button', () => {
    cy.contains('[data-cy="ingredient-item"]', 'Мини-салат Экзо-Плантаго')
      .scrollIntoView()
      .click();

    cy.get('[data-cy="ingredient-modal"]').should('be.visible');

    cy.get('[data-cy="ingredient-modal"]')
      .find('[data-cy="button-modal-close"]')
      .click();

    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });

  it('should close modal on click overlay', () => {
    cy.contains('[data-cy="ingredient-item"]', 'Мини-салат Экзо-Плантаго')
      .scrollIntoView()
      .click();

    cy.get('[data-cy="ingredient-modal"]').should('be.visible');

    cy.get('[data-cy="overlay-modal-close"]').click({ force: true });

    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });
});
