const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const app = server.app;
const storage = server.storage;
 
 
chai.use(chaiHttp);

const {User, Mood} = require('../models');
const {runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

function seedMoodData(){
  console.info('seeding mood data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateMoodData());
  }
  return Mood.insertMany(seedData);
}

function generateMoodData() {
  return {
    date: faker.lorem.date(),
    description: faker.lorem.sentence(),
    cause: faker.lorem.sentence(),
    duration: faker.lorem.sentence()
   
  }
}

function tearDownDb(){
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}




describe('API', function() {
  before(function (){
    runServer();
  })
  after(function() {
    closeServer();
  })

describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        res.should.have.status(200);
        
        done();
    });
      });
  });

  describe('boosters page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        res.should.have.status(200);
   
        done();
    });
      });
  });

  describe('tracking page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        res.should.have.status(200);
   
        done();
    });
      });
  });

  describe('record mood page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        res.should.have.status(200);
   
        done();
    });
      });
  });

  describe('GET endpoint', function() {
      it('should return users', function() {
      
      let res;
      return chai.request(app)
       .get('/users/')
       .then(function(_res) {
         res = _res;  
         res.should.have.status(200);
         res.should.be.json;
       });
   });
  
   it('should return tracked moods', function() {
     let resMood;
     return chai.request(app)
       .get('/users/')
       .then(function(_res) {
         res = _res;  
         res.should.have.status(200);
         res.should.be.json;
       });
   });
  });
});

 