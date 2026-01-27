describe('Burger Ingredients', () => {
  beforeEach(() => {
    // перехват запроса на эндпоинт 'api/ingredients’, в ответе на который возвращаются созданные ранее моковые данные
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Посещаем страницу
    cy.visit('/');
  });

  it('should load ingredients from mock', () => {
    // Ждём завершения запроса
    cy.wait('@getIngredients');

    // Проверяем, что ингредиенты отображаются
    cy.contains('Краторная булка N-200i').should('be.visible');
  });
});
