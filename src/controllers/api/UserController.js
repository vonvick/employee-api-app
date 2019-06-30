import db from '../../models';

const userAttributes = [
  'first_name',
  'last_name',
  'email',
  'phone'
];

const addNewUser = async (req, res) => {
  try {
    const newEmployee = await db.Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.first_name,
      email: req.body.email,
      phone: req.body.phone
    });
    
    return res.status(201).json({ data: newEmployee });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ errors: formatErrorMessage(error) });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const query = {
    attributes: userAttributes,
  };
  if (req.query.offset) {
    query.offset = req.query.offset;
  }
  if (req.query.limit) {
    query.limit = req.query.limit;
  }

  try {
    const usersList = await db.Employee.findAndCountAll(query)
    if (usersList.count === 0) {
      return res.status(404).json({ message: 'No user found' })
    }
    return res.status(200).json({ data: { ...usersList } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const formatErrorMessage = (error) => {
  return error.errors.reduce((acc, current, index) => {
    if (index < error.errors.length - 1) {
      acc += `${current.message}, `;
      return acc;
    }
    acc += `${current.message}.`;
    return acc;
  }, '');
};

export default {
  addNewUser,
  getAllUsers,
};
