const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        userController.create(user, (err, result) => {
          console.log("log of created user " + err + "  " + result);
        })
      })
      done()
    })
  })
  //TODO Create test for the get method
  describe('Get', ()=> {
    
    it('get a user by username', (done) => {
      // 1. First, create a user to make this unit test independent from the others
      
      const newUser = {
        username: 'deepanshuyadav',
        firstname: 'Deepanshu',
        lastname: 'Yadav'
      }
      userController.create(newUser, (err, result) => {
        console.log("Inside test 1 err is " + err + "  res is " + result)
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');
        // 2. Then, check if the result of the get method is correct
        userController.get(newUser, (err, result) => {
          console.log("Inside test 2 err is " + err + "  res is " + result)
          expect(result).to.be.equal('deepanshuyadav');
          expect(err).to.be.equal(null);
          done()
        }) 
      })  
           
    })
  
    it('Cannot get a user when it does not exist', (done) => {
      // Chech with any invalid user
      const newUser = {
        username: 'deepanshuyadav',
        firstname: 'Deepanshu',
        lastname: 'Yadav'
      }
      
      userController.get(newUser, (err, result) => {
        expect(err.toString()).to.be.equal("Error: User Name does not exist.");
        //console.log(err);
        expect(result).to.be.equal(null);
        done();
      })
      
    })
  })
})
