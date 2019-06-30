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
    it('creates a new employee', () => {
      request
        .post('/api/users')
        .send(userParams)
        .end(async(err, res) => {
          if (err) return;
          createdUser = await res.body.data;
          expect(res.status).to.equal(201);
          expect(createdUser.first_name).to.equal(userParams.first_name);
        });
    });

    it('throws an error if a user with the same email already exists', () => {
      request
        .post('/api/users')
        .send(secondUser)
        .end(async(err, res) => {
          if (err) return;
          createdUser = await res.body.data;
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('GetAllUsers GET: /api/users', () => {
    it('gets all employees', () => {
      request
        .get('/api/users')
        .end(async(err, res) => {
          if (err) return;
          usersList = await res.body.data;
          expect(res.status).to.equal(200);
          expect(usersList.count).to.equal(2);
        });
    });
  });
});