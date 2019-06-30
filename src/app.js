import express from 'express';
import bodyParser  from 'body-parser';

import routes from './routes';

const app = express();
const router = express.Router();

routes(router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

const port = process.env.PORT || 5600;

app.listen(port, () => {
  console.log(`App started on port: ${port}`)
});
