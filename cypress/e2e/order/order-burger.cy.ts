describe('Authenticated User Flow', () => {
  const MOCK_ACCESS_TOKEN = 'fake-access-token-123';
  const MOCK_REFRESH_TOKEN = 'fake-refresh-token-456';

  beforeEach(() => {
    //загрузка ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');

    // установка токенов в localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', MOCK_ACCESS_TOKEN);
      win.localStorage.setItem('refreshToken', MOCK_REFRESH_TOKEN);
    });

    // установка токенов в cookies
    cy.setCookie('accessToken', MOCK_ACCESS_TOKEN);
    cy.setCookie('refreshToken', MOCK_REFRESH_TOKEN);

    // Мокаем запрос к /auth/user
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
  });

  afterEach(() => {
    // Очищаем localStorage
    cy.window().then((win) => {
      win.localStorage.removeItem('accessToken');
      win.localStorage.removeItem('refreshToken');
    });

    // Очищаем cookies
    cy.clearCookie('accessToken');
    cy.clearCookie('refreshToken');
  });

  //проверка авторизован ли пользователь
  it('should display user profile with mocked tokens', () => {
    cy.visit('/profile');
    cy.wait('@getUser');
    cy.get('[data-cy="user-name"]').should('have.value', 'Ivan Ivanov');
  });

  it('can assemble a burger in the constructor and place an order', () => {
    // Мокаем запрос на создание заказа
    cy.intercept('POST', '**/orders', {
      fixture: 'order-response.json'
    }).as('createOrder');

    //собрали в конструкторе бургер
    cy.contains('[data-cy="ingredient-item"]', 'Мини-салат Экзо-Плантаго')
      .scrollIntoView()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-cy="burger-constructor"]')
      .contains('Мини-салат Экзо-Плантаго')
      .should('be.visible');

    cy.contains('[data-cy="ingredient-item"]', 'Краторная булка N-200i')
      .scrollIntoView()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-cy="constructor-bun-top"]').contains(
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="constructor-bun-bottom"]').contains(
      'Краторная булка N-200i'
    );

    //нажали на кнопку оформить заказ
    cy.get('[data-cy="order-button-constructor"]').click();

    //запрос ушел
    cy.wait('@createOrder');

    //открылось модально окно заказа
    cy.get('[data-cy="order-modal"]').should('be.visible');

    // проверка номера заказа
    cy.get('[data-cy="order-number"]').should('have.text', '12345');

    //закрыли модальное окно
    cy.get('[data-cy="order-modal"]')
      .find('[data-cy="button-modal-close"]')
      .click();
    cy.get('[data-cy="order-modal"]').should('not.exist');

    //проверка очищенного конструктора
    cy.get('[data-cy="burger-constructor-main"]')
      .should('not.contain', 'Краторная булка N-200i')
      .and('not.contain', 'Мини-салат Экзо-Плантаго');
  });
});
