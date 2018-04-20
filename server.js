const next = require('next');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

const { createServer } = require('http');

app.prepare().then(() => {
  createServer(handler).listen(3000, error => {
    if (error) throw error;
    console.log('====================================');
    console.log('Running on port 3000');
    console.log('====================================');
  });
});
