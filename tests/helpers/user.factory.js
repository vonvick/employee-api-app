import faker from 'faker';]

export default {
  users: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.internet.phone()
  }
}