import chai from 'chai';
import supertest from 'supertest';

import app from '../../src/app';

import factory from '../helpers/user.factory';

import db from '../../src/models';

const expect = chai.expect;

const request = supertest(app);

describe('User Controller', () => {
  let createdUser, usersList;
  let userParams = factory.users;
  let secondUser = factory.secondUser;

  before(async() => {
    await db.Employee.create(secondUser);
  });

  after(async() => {
    await db.Employee.sequelize.sync({ force: true });
  });

  describe('AddUser POST: /api/users', () => {
    it('creates a new employee', (done) => {
      request
        .post('/api/users')
        .send(userParams)
        .end((err, res) => {
          if (err) return done(err);
          createdUser = res.body.data;
          expect(res.status).to.equal(201);
          expect(createdUser.first_name).to.equal(userParams.first_name);
          done();
        });
    });

    it('throws an error if a user with the same email already exists', (done) => {
      request
        .post('/api/users')
        .send(secondUser)
        .end((err, res) => {
          console.log(res.status)
          if (err) return done(err);
          createdUser = res.body.data;
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('GetAllUsers GET: /api/users', () => {
    it('gets all employees', (done) => {
      request
        .get('/api/users')
        .end((err, res) => {
          if (err) return done(err);
          usersList = res.body.data;
          expect(res.status).to.equal(200);
          expect(usersList.count).to.equal(2);
          done();
        });
    });
  });
});