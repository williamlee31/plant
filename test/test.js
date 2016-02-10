var authHelper = require("../server/helperFunctions/authHelper.js");
var deviceHelper = require("../server/helperFunctions/deviceHelper.js");
var emailHelper = require("../server/helperFunctions/emailHelper.js");
var signHelper = require("../server/helperFunctions/signHelper.js");
var userHelper = require("../server/helperFunctions/userHelper.js");

var expect = require('chai').expect;
var app = require("../server/server.js");
var supertest = require('supertest');
var querystring = require('querystring');

var request = supertest.agent(app);
var token, username;


describe("server", function() {
  describe("GET /", function () {
    it("should return the content of index.html", function (done) {
      request
        .get('/')
        .expect(200, done);
    });
  });
});

describe("sign up and sign in", function() {
  describe('POST', function() {
    it("should sign up a new user", function(done) {
      request
        .post('/api/users/signup')
        .send({
          'email': 'test@test.com',
          'firstname': 'Bob',
          'lastname': 'Joe',
          'password': 'password',
          'username': 'bjoe'
        })
        .expect(200, function(err) {
          done(err);
        });
    });

    it("should log in an existing user", function(done) {
      request
        .post('/api/users/signin')
        .send({
          'username': 'bjoe',
          'password': 'password'
        })
        .expect(200, function(err, res){
          token = res.body.token;
          username = res.body.username;
          done(err);
        });
    });
  });
});

describe("should give info on an existing user", function(done) {
  describe('GET', function() {
    it("should return data on user", function(done) {
      request
        .get('/api/users?token='+token)
        .expect(200, function(err, res){
          done(err);
        })
    })
  })
})
