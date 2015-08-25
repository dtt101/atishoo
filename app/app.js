import koa from 'koa';
import koarouter from 'koa-router';
import koaBody from 'koa-better-body';
import cors from 'koa-cors';
import api from './api';

const app = new koa();

let router = new koarouter();

router
  .get('/', function*() {
    this.body = 'Bless you!';
  })
  .use('/api', api.routes());

app.use(cors());
app.use(koaBody());
app.use(router.routes());

export default app;
