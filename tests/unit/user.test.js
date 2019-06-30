import chai from 'chai';
import db from '../../src/models';
import factory from '../helpers/user.factory';

const expect = chai.expect;

describe('User Model', () => {
  let user;
  let userParams = factory.users;
  beforeEach((done) => {
    user = db.Employee.build(userParams);
    done();
  });

  after(async(done) => {
    await db.Employee.sequelize.sync({ force: true });
    done();
  });

  describe('Create Employee', () => {
    it('creates a Role instance', () => expect(user).to.exist);

    it('has both first and last name', () => {
      expect(user.first_name).to.equal(userParams.first_name);
      expect(user.last_name).to.equal(userParams.last_name);
    });
  })
});
