import koarouter from 'koa-router';
import augment from './augment';
import all from './all';

let router = new koarouter();

router.use('/', augment);
router.get('/', all);

export default router;
