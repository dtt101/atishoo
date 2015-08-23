import koarouter from 'koa-router';
import * as github from '../../components/github';

let router = new koarouter();

router.get('/', function* (next) {
  let issues = yield github.getIssues();
  this.body = issues;
  yield next;
});

export default router;
