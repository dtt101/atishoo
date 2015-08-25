import koarouter from 'koa-router';
import augment from './augment';
import all from './all';
import upsert from './upsert';

let router = new koarouter();

router.use('/', augment);

router.get('/', all);
router.patch('/:id', upsert);

export default router;
