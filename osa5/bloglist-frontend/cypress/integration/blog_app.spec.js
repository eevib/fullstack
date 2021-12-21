describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
          name: 'Eevi',
          username: 'eebe',
          password: 'secret'
      }
      const user2 = {
          name: 'Thomas',
          username: 'thomas',
          password: 'secret'
      }
      cy.request('POST', 'http://localhost:3000/api/users', user)
      cy.visit('http://localhost:3000')
      cy.request('POST', 'http://localhost:3000/api/users', user2)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('username')
      cy.get('#username')
      cy.contains('password')
      cy.get('#password')
      cy.contains('login')
    })
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('eebe')
        cy.get('#password').type('secret')
        cy.contains('login').click()
        cy.contains('logout').click()
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('eebe')
        cy.get('#password').type('wrongpassword')
        cy.contains('login').click()
        cy.contains('wrong username or password')
      })
    })
    describe('When loged in', function() {
        beforeEach(function() {
          cy.login({ username: 'eebe', password: 'secret' })
        })
        it('a blog can be created', function() {
          cy.contains('create blog').click()
          cy.get('#title').type('test blog')
          cy.get('#author').type('unknown')
          cy.get('#url').type('www.testblog.com')
          cy.get('#createButton').click()
          cy.contains('a new blog test blog by unknown added')
          cy.get('#titleView').contains('test blog')
          cy.get('#viewButton').contains('view')
        })
        describe('and blog exists', function() {
            beforeEach(function () {
                cy.createBlog({
                  title: 'christmasblog',
                  url: 'www.christmasblog.net',
                  author: 'santa',
                })
            })
            it('a blog can be liked', function() {
                cy.get('#viewButton').click()
                cy.get('#likeButton').click()
                cy.contains(1)
            })
            it('a blog can be deleted', function() {
              cy.get('#viewButton').click()
              cy.contains('christmasblog')
              cy.get('#deleteButton').click()
              cy.contains('Deleted blog christmasblog')
            })
        })
        it('user can not delete other users blogs', function() {
          cy.createBlog({
              title: 'christmasblog',
              url: 'www.christmasblog.net',
              author: 'santa',
          })
          cy.contains('logout').click()
          cy.login({ username: 'thomas', password: 'secret' })
          cy.get('#viewButton').click()
          cy.get('#blogView').should('not.contain', '#deletButton')
          }) 
        })
        describe('when many blogs exist', function() {  
          beforeEach(function() {
            cy.login({ username: 'eebe', password: 'secret' })
            cy.createBlog({ title: 'blog2', author: 'aut2', url: "www.blog2.com" })
            cy.createBlog({ title: 'blog3', author: 'aut3', url: "www.blog3.com" })
            cy.createBlog({ title: 'blog4', author: 'aut4', url: "www.blog4.com" })            
          })
    })
})
  