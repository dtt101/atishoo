import config from '../config';
import monk from 'monk';
import wrap from 'co-monk';

let url = config['mongo-url'],
  client;

let connect = function*() {
  if (!client) {
    console.log('connecting to db');
    let db = monk(url);
    client = wrap(db.get('issues'));
  }
  return client;
};

export function* filter(ids) {
  let issuesCollection = yield * connect();
  let issues = yield issuesCollection.find( { github_id: { $in: ids } } );
  if (issues) {
    return issues;
  }
}

export function* upsert(github_id, data) {
  // TODO: create or save provided data on object matching github_id
}
