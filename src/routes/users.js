import { addNewUser, getAllUsers } from '../controllers/api/UserController';

const UserRoute = (router) => {
  router
    .route('/users')
    .post(UserController.addNewUser);

  router
    .route('/users')
    .get(UserController.getAllUsers);
}

export default UserRoute;
