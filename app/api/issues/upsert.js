import * as github from '../../components/github';

export default function* (next) {
  // TODO: call upsert with github_id and data
  // inserts a new or updates an existing augmented github issue
  // findAndModify with monk or insert
  yield next;
}
