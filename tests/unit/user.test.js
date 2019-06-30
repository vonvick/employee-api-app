import chai from 'chai';
import db from '../../src/models';
import factory from '../helpers/user.factory';

const expect = chai.expect;

describe('Employee Model', () => {
  let user;
  let userParams = factory.users;

  beforeEach((done) => {
    user = db.Employee.build(userParams);
    done();
  });

  after(async() => {
    await db.Employee.sequelize.sync({ force: true });
  });

  describe('Create', () => {
    it('creates a Role instance', () => expect(user).to.exist);

    it('has the required user attribute', () => {
      expect(user.first_name).to.equal(userParams.first_name);
      expect(user.last_name).to.equal(userParams.last_name);
      expect(user.email).to.equal(userParams.email);
      expect(user.phone).to.equal(userParams.phone);
    });

    it('saves the user without errors', async () => {
      const newUser = await user.save();

      expect(newUser.first_name).to.equal(userParams.first_name);
    });
  });

  describe('Validations', () => {
    describe('UNIQUE attributes', () => {
      it('fails for non unique email', async () => {
        try {
          await user.save();
          const secondUser = await db.User.build(userParams).save()
  
          expect(secondUser).to.not.exist
        } catch (err) {
          expect(/UniqueConstraintError/.test(err.name)).to.be.true
        }            
      });
    });

    it('fails for invalid email', async () => {
      try {
        user.email = 'invalid email';
        const newUser = await user.save();
        expect(newUser).to.not.exist;
      } catch (error) {
        expect(/Validation isEmail on email failed/.test(error.errors[0].message)).to.be.true;
      }
    });
  });
});
