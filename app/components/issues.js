import config from '../config';
import { parse } from 'url';
import monk from 'monk';
import wrap from 'co-monk';

let url = parse(config['mongo-url']);
let db = monk('localhost:27017/atishoo');
let issuesCollection = wrap(db.get('issues'));

export function* get(ids) {
  let issues = yield issuesCollection.find( { github_id: { $in: ids } } );
  if (issues) {
    return issues;
  }
}
