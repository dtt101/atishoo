import * as github from '../../components/github';

export default function* (next) {
  let issues = yield github.getIssues();
  this.body = issues;
  yield next;
}
