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
        .expect('Content-Type', /json/)
        .expect(hasInfo)
        .end(done);

        function hasInfo(response) {
          if(response.body.firstname === "Bob" && response.body.lastname === "Joe" && response.body.username === "bjoe"){
            return true;
          } else {
            throw new Error("wrong info");
          }
        }
    });

    it("should log in an existing user", function(done) {
      request
        .post('/api/users/signin')
        .send({
          'username': 'bjoe',
          'password': 'password'
        })
        .expect('Content-Type', /json/)
        .expect(userInfo)
        .end(done);

        function userInfo(response) {
          token = response.body.token;
          if(response.body.firstname === "Bob" && response.body.lastname === "Joe" && response.body.username === "bjoe"){
            return true;
          } else {
            throw new Error("wrong info");
          }
        }
    });
  });
});

describe("should give info on an existing user", function(done) {
  describe('GET', function() {
    it("should return data on user", function(done) {
      request
        .get('/api/users?token='+token)
        .expect('Content-Type', /json/)
        .expect(exisitingUser)
        .end(done);

        function exisitingUser(response) {
          token = response.body.token;
          username = response.body.username;
          if(response.body.firstname === "Bob" && response.body.lastname === "Joe" && response.body.username === "bjoe"){
            return true;
          } else {
            throw new Error("wrong info");
          }
        }
    })
  })
})

describe("should register a new device", function(done) {
  describe('GET', function() {
    it("should return true when new device added", function(done) {
      request
        .post('/api/devices')
        .send({
          name: "test",
          username: username,
          zipCode: "91326",
          apiKey: "123"
        })
        .expect(exisitingUser)
        .end(done);

        function exisitingUser(response) {
          token = response.body.token;
          if(response.text === 'Saved device in database'){
            return true;
          } else {
            throw new Error("wrong info");
          }
        }
    })
  })
})
