describe('Counter Application', () => {
    beforeEach(() => {
        // assuming you're running your dev server on port 3000
        cy.visit('http://localhost:3000');
      });
    
      it('displays the initial count', () => {
        cy.get('h1').should('contain', 'Count: 0');
      });
    
      it('increments the counter on button click', () => {
        cy.get('button').contains("Increment").click();
        cy.get('h1').should('contain', 'Count: 1');
    
        cy.get('button').contains("Increment").click();
        cy.get('h1').should('contain', 'Count: 2');
      });
    it('does not re-render CounterButton on dummy state change', () => {
        let logCalledWithExpectedMessage = false;
    
        cy.on('window:console', (msg) => {
          if (msg && msg[0] === 'CounterButton rendered!') {
            logCalledWithExpectedMessage = true;
          }
        });
    
        // Change the dummy state to cause re-render
        cy.get('button').contains('Change Dummy State').click();
    
        // Assert if the log was called with the expected message
        cy.wrap(null).should(() => {
          expect(logCalledWithExpectedMessage).to.be.false;
        });
      });
  });
  
  // Utility to spy on console logs
  Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));
  