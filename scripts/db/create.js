require('dotenv').config({ silent: true });
import path from 'path';

import { exec } from 'child-process-promise';
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

  try {
    console.log('Create running');
    await exec(
      `createdb -U ${parts.username} -h ${parts.host} -p ${parts.port} -O ${parts.username} ${parts.path[0]}`,
      spawnOptions
    );
    console.log('*************************');
    console.log('Create successful');
  } catch (err) {
    console.log('*************************');
    console.log('Create failed. Error:', err.message);
  }

  process.exit(0);
})();