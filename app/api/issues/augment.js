import _ from 'lodash';
import * as issues from '../../components/issues';

export default function* (next) {
  yield next;
  let responseIssues = this.response.body;
  let ids = _.pluck(responseIssues, 'id');
  console.log('ids:' + ids);
  let augmentedIssues = yield * issues.get(ids);
  // TODO: use insert data from augmenttedIssues into responseIssues
  this.response.body = responseIssues;
}
