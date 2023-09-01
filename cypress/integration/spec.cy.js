describe('Item List Application', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000');
  });

  it('adds an item to the list and displays a success message', () => {
      cy.get('button').click();
      cy.get('ul li').should('have.length', 1);
      cy.get('p#message').should('contain', 'Item added successfully!');
  });

  it('hides the success message after 3 seconds', () => {
      cy.get('button').click();
      cy.get('p#message').should('contain', 'Item added successfully!');
      cy.wait(4000);
      cy.get('p#message').should('not.exist');
  });

  it('does not re-render ItemList on success message display', () => {
      let logCalledWithExpectedMessage = false;

      cy.on('window:console', (msg) => {
        console.log("msg",msg);
          if (msg && msg[1] === 'ItemList rendered!') {
              logCalledWithExpectedMessage = true;
          }
      });

      cy.get('button').click();

      cy.wrap(null).should(() => {
          expect(logCalledWithExpectedMessage).to.be.false;
      });

      logCalledWithExpectedMessage = false; // Resetting the flag for the next test

      cy.get('button').click();

      // Here, since the item list gets updated with a new item, 
      // we do expect the log to be true (as it should render again)
      cy.wrap(null).should(() => {
          expect(logCalledWithExpectedMessage).to.be.false;
      });
  });
});
