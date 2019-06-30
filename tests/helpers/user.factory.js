import faker from 'faker';

export default {
  users: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone: '93439432323'
  },
  secondUser: {
    first_name: 'Yokohama',
    last_name: 'Suzuki',
    email: 'secondOga@test.com',
    phone: '93529565295'
  },
};
