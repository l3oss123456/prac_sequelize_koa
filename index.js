const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
// import Koa from 'koa'
const appConfig = require('./configs/app');
const indexRoute = require('./routes/index');
const app = new Koa();

app.use(bodyParser());
app.use(indexRoute.routes());

const server = app.listen(appConfig.NODE_PORT).on('error', err => {
   console.log(err);
});

module.exports = server;

// "serve": "node ./index.js",
//     "start": "nodemon node ./index.js"