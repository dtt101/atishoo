import koa from 'koa';
import koarouter from 'koa-router';
import cors from 'koa-cors';

const app = new koa();

app.use(cors());

let router = new koarouter();

router.get('/', function*() {
  this.body = 'Bless you!';
});

app.use(router.routes());

export default app;
