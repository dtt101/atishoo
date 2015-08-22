import koarouter from 'koa-router';
import issuesRouter from './issues';

let router = new koarouter();

router.use('/issues', issuesRouter.routes());

export default router;
