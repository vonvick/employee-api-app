import express from 'express';
import bodyParser  from 'body-parser';

import routes from './routes';
import models from './models';

const app = express();
const router = express.Router();

routes(router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

const port = process.env.PORT || 5600;

models.sequelize.sync().then(() => {
  console.log('Database server synced');
}).catch(() => {
  console.log('Database server could not be synced');
})

app.listen(port, () => {
  console.log(`App started on port: ${port}`)
});