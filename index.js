const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const appConfig = require('./configs/app');
const indexRoute = require('./routes/index');
const app = new Koa();

app.use(bodyParser());
app.use(indexRoute.routes());

const server = app.listen(appConfig.NODE_PORT).on('error', err => {
   console.log(err);
});

module.exports = server;