describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should add an ingredient to the constructor when clicked', () => {
    //IngredientsCategoryUI добавлен атрибут, далее передала через ...rest
    cy.contains('[data-cy="ingredient-item"]', 'Говяжий метеорит (отбивная)')
      .scrollIntoView()
      .within(() => {
      // .within() ограничивает поиск только внутри найденной карточки
      cy.contains('button', 'Добавить').click();
      });

    // BurgerConstructorUI добавлен атрибут; проверка, что ингредиент появился в конструкторе
    cy.get('[data-cy="burger-constructor"]')
      .contains('Говяжий метеорит (отбивная)')
      .should('be.visible');
  });

  it('should add a bun and appear on top and bottom', () => {
    // Кликаем по булке
    cy.contains('[data-cy="ingredient-item"]', 'Флюоресцентная булка R2-D3')
      .scrollIntoView()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // BurgerConstructorUI добавлены атрибуты; проверка, что булка отображается сверху и снизу
    cy.get('[data-cy="constructor-bun-top"]').contains('Флюоресцентная булка R2-D3');
    cy.get('[data-cy="constructor-bun-bottom"]').contains('Флюоресцентная булка R2-D3');
  });
});
