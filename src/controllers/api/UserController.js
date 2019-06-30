const addNewUser = (req, res) => {
  return res.status(201).json({ data: 'user saved successfully'});
};

const getAllUsers = (req, res) => {
  return res.status(200).json({ data: [] });
};

export default {
  addNewUser,
  getAllUsers,
};
