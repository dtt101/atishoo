import _ from 'lodash';
import * as issues from '../../components/issues';

export default function* (next) {
  yield next;
  let responseIssues = this.response.body;
  let ids = _.pluck(responseIssues, 'id');
  let augmentedIssues = yield * issues.filter(ids);
  let mergedIssues = _.map(responseIssues, function(item){
      return _.merge(item, _.findWhere(augmentedIssues, { github_id: item.id }));
  });
  this.response.body = mergedIssues;
}
