import _ from 'lodash';

export default function* (next) {
  yield next;
  let ids = _.pluck(this.response.body, 'id');
  // TODO:
  // lookup ids in db
  // loop through db results and for each matching id
  // update object in response body inside custom object

}
