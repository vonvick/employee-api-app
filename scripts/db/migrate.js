require('dotenv').config({ silent: true });
import path from 'path';

import { spawn } from 'child-process-promise';
import { parseURL } from 'whatwg-url';

const spawnOptions = { cwd: path.join(__dirname, '../..'), stdio: 'inherit' };

(async () => {
  let urlString = process.env.DEV_DATABASE_URL;
  if (process.env.NODE_ENV === 'test') {
    urlString = process.env.TEST_DATABASE_URL
  } else if (process.env.NODE_ENV === 'production') {
    urlString = process.env.PROD_DATABASE_URL
  }
  const parts = parseURL(urlString);
  //Strip our search params
  const url = `${parts.scheme}://${parts.username}:${parts.password}@${parts.host}:${parts.port || 5432}/${parts.path[0]}`;
  console.log('url::', url);

  try {
    await spawn('./node_modules/.bin/sequelize', ['db:migrate', `--url=${url}`], spawnOptions);
    console.log('*************************');
    console.log('Migration successful');
  } catch (err) {
    console.log({err}, 'Error')
    console.log('*************************');
    console.log('Migration failed. Error:', err.message);
  }

  process.exit(0);
})();