require('dotenv').config({ silent: true });
import path from 'path';

import { spawn } from 'child-process-promise';

const spawnOptions = { cwd: path.join(__dirname, '../..'), stdio: 'inherit' };

(async () => {
  let url = process.env.DEV_DATABASE_URL;
  if (process.env.NODE_ENV === 'test') {
    url = process.env.TEST_DATABASE_URL
  } else if (process.env.NODE_ENV === 'production') {
    url = process.env.PROD_DATABASE_URL
  }

  try {
    await spawn('./node_modules/.bin/sequelize', ['db:migrate:undo', `--url=${url}`], spawnOptions);
    console.log('*************************');
    console.log('Migration rollback successful');
  } catch (err) {
    console.log('*************************');
    console.log('Migration rollback failed. Error:', err.message);
  }

  process.exit(0);
})();