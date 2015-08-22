import koarouter from 'koa-router';

let router = new koarouter();

router.get('/', function* (next) {
  this.body = {
    "links": {
      "self": "http://localhost:3000/issues"
    },
    "data": [{
      "type": "issues",
      "id": "1",
      "attributes": {
        "title": "WHAT?"
      }
    }, {
      "type": "issues",
      "id": "2",
      "attributes": {
        "title": "SHAMAALLAYMAN"
      }
    }]
  };
  yield next;
});

export default router;
