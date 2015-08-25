import * as issues from '../../components/issues';

export default function* (next) {
  let github_id = Number.parseInt(this.request.body.fields.data.id);
  let data = this.request.body.fields.data.attributes;
  let res = yield issues.upsert(github_id, data);
  if (res === 1) {
    this.status = 204;
  }
  yield next;
}
