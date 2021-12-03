




  describe('page loads', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:3000/') // change URL to match your dev URL
  

    })
  })

  // // describe('signup', () => {
  // //   it('finds input', function () {
  // //       cy.visit('http://localhost:3000/signup')
  // //       cy.get('#firstName')
  // //       .should('be.visible')
  // //       .type('joe')

  // //       cy.get('#lastName')
  // //       .should('be.visible')
  // //       .type('zhang')

  // //       cy.get('#email')
  // //       .should('be.visible')
  // //       .type('joezhang@gmail.com')

  // //       cy.get('#password')
  // //       .should('be.visible')
  // //       .type('12345678{enter}')

  // //       x = cy.includes('The email address is already in use by another account. (auth/email-already-in-use).')
  // //       cy.log(x)
  // //     })



  // //   })
  

  // //     describe('logout', () => {
  // //       it('finds inputs and types in information', function () {
  // //           // destructuring assignment of the this.currentUser object
  // //           cy.get('#basic-button').click()
  // //           cy.contains('Logout').click()
  // //         })
  // //     })
  
    
  
    describe('login', () => {
      it('finds inputs and types in information', function () {
          // destructuring assignment of the this.currentUser object
          cy.get('#email')
          .should('be.visible')
          .type('bigbobho@gmail.com')
  
          cy.get('#password')
          .should('be.visible')
          .type('12345678{enter}')
        })
    })
  
  //   describe('navigate home page', () => {
  //     it('navigate through patient treatments', function () {
  //         // destructuring assignment of the this.currentUser object
  //         cy.contains('Upcoming').click()
  //         cy.contains('Overdue').click()
  //         cy.contains('Completed').click()
  
  //         cy.get('.home').get('h4')
  //           .contains('Bob')
  //           .contains('Ho')
            
  
          
  //       })
  //   })
  
  //   describe('navigate menu items', () => {
  //     it('navigate through patient treatments', function () {
  //         // destructuring assignment of the this.currentUser object
  //         cy.get('nav').get('ul').click({force: true})
  //         cy.get('nav').contains('Patients').click()
  //         cy.get('nav').get('ul').click({force: true})
  //         cy.get('nav').contains('Messages').click()
  //         cy.get('nav').get('ul').click({force: true})
  //         cy.get('nav').contains('Help').click()
  
          
  //       })
  //   })
  
  //   describe('logout', () => {
  //     it('finds inputs and types in information', function () {
  //         // destructuring assignment of the this.currentUser object
  //         cy.get('#basic-button').click()
  //         cy.contains('Logout').click()
  //       })
  //   })



    

    

