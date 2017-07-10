const chai = require('chai');
 const chaiHttp = require('chai-http');

 const {app} = require('../server');

 const should = chai.should();
 chai.use(chaiHttp);

const {User, Mood} = require('../models');
const {runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

function seedMoodData(){
  console.info('seeding list data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateMoodData());
  }
  return Mood.insertMany(seedData);
}

function generateListData() {
  return {
   
    name: faker.lorem.text(),
    description: faker.lorem.sentence()
   
  }
}

function tearDownDb(){
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}





 describe('API', function() {

 describe('GET endpoint', function() {

   it('should return all existing tracked moods', function() {
       let res;
     return chai.request(app)
       .get('/')
       .then(function(_res) {
         res = _res;  
         res.should.have.status(200);
         res.should.be.json;
       });
   });
 });


 it('should return tracked moods with the right fields', function () {
     return chai.request(app)
     .get('/')
     .then(function(res){
         res.should.have.status(200)
     });
 })
 });