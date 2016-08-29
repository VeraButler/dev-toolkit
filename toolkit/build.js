import webpack from 'webpack';
import path from 'path';

import config from './webpack/config';
import generateStaticFiles from './build/generateStaticFiles';
import { rootForRequire, routes, PATHS } from './_userSettings';

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((error) => {
  if (error) {
    console.log(error);
  }

  try {
    // Use similar setup as for a test-environment (but with NODE_ENV set to `production`)
    // eslint-disable-next-line global-require
    require('./utils/testHelpers/setupDOM');
    // eslint-disable-next-line global-require
    require('./utils/testHelpers/setupClientApp');
    // eslint-disable-next-line global-require
    const staticRender = require(path.join(rootForRequire, '/src/server/staticRender')).default;

    console.log('\n\n 🍰  Generating static files 💪\n');
    // Take index.html file and create an html-file for each route
    generateStaticFiles(staticRender, routes, PATHS, 'done');
  }
  catch (e) {
    if (e) {
      // console.log(e);
    }
    console.log('\n\n 🍰  Your build files are ready 💪\n');
  }
});
