import koa from 'koa';
import koarouter from 'koa-router';
import cors from 'koa-cors';
import api from './api';

const app = new koa();

app.use(cors());

let router = new koarouter();

router
  .get('/', function*() {
    this.body = 'Bless you!';
  })
  .use('/api', api.routes());

app.use(router.routes());

export default app;
