describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Michael Jordan',
      username: 'mike',
      password: 'parole'
    }
    const secondUser = {
      name: 'Scottie Pippen',
      username: 'scott',
      password: 'parole'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', secondUser)
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log into application')
    cy.get('#password')
    cy.get('#username')
  })

  describe('login test', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mike')
      cy.get('#password').type('parole')
      cy.get('#login-submit').click()
      cy.contains('Create Blog')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-submit').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('whilst logged-in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'mike', password: 'parole'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('a blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get('input[name="title"]').type('React for Beginners')
      cy.get('input[name="author"]').type('Kent Dodds')
      cy.get('input[name="url"]').type('www.com')
      cy.contains('Upload').click()
      cy.get('.notification')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#toggled-content')
        .should('have.css', 'display', 'none')
      cy.contains('React for Beginners')
    })

    describe('when blog created', function() {

      beforeEach(function() {
        const userToken = JSON.parse(localStorage.getItem('loggedUser')).token
        const token = `Bearer ${userToken}`

        blogs.forEach(async (blog) => {
          await cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/blogs', // baseUrl is prepended to url,
            headers: {
              Authorization: token,
            },
            body: blog,
          })
        })

        cy.visit('http://localhost:3000')
      })
      it('a blog can be liked', function() {
        cy.contains('React for Beginners')
          .children().contains('show').click().as('showDetails')
        cy.get('@showDetails').siblings().contains('Vote').click()
        cy.get('@showDetails').siblings().should('not.contain', 'likes: 6')
      })

      it('a blog can be deleted by the poster', function() {
        cy.contains('React for Beginners')
          .children().contains('show').click().as('showDetails')
        cy.get('@showDetails').siblings().contains('Delete').click()
        cy.contains('React for Beginners').should('not.exist')
      })

      it('a blog cannot be deleted by other users', function() {
        cy.contains('Logout').click()

        // login with different user
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'scott', password: 'parole'
        }).then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })

        cy.contains('React for Beginners')
          .children().contains('show').click().as('showDetails')
        cy.get('@showDetails').siblings().contains('Delete').click()
        cy.get('.error')
          .should('contain', 'could not remove the blog')
        cy.contains('React for Beginners')
      })

      it('blogs are in descending order by likes', function() {

        cy.get('.blog-likes').eq(0).then($lk1 => {
          const likes1 = Number($lk1.text())

          cy.get('.blog-likes').eq(1).then($lk2 => {
            const likes2 = Number($lk2.text())
            expect(likes1).to.be.greaterThan(likes2)

            cy.get('.blog-likes').eq(2).then($lk3 => {
              const likes3 = Number($lk3.text())
              expect(likes2).to.be.greaterThan(likes3)
            })
          })
        })
      })
    })
  })
})

const blogs = [
  {
    title: 'React for Beginners',
    author: 'Kent Dodds',
    url: 'www.react.com',
    likes: 5
  },
  {
    title: 'Vue for Beginners',
    author: 'Elen Smith',
    url: 'www.vue.com',
    likes: 35,
  },
  {
    title: 'Nodejs for Beginners',
    author: 'Hannah Johnson',
    url: 'www.nodejs.com',
    likes: 10,
  },
  {
    title: 'Deno Best Practices',
    author: 'Hannah Johnson',
    url: 'www.nodejs.com',
    likes: 150,
  },
  {
    title: 'Gatsby Toolkit',
    author: 'Austris Bird',
    url: 'www.nodejs.com',
    likes: 60,
  },
]