import config from '../config';
import * as bb from 'bluebird';
import {
  parse
}
from 'url';
import mongodb from 'mongodb';

let MongoClient = mongodb.MongoClient,
  Collection = mongodb.Collection;

bb.promisifyAll(MongoClient);
bb.promisifyAll(Collection);

let url = parse(config['mongo-url']),
  expireAfterSeconds = isNaN(parseInt(config['mongo-cache-seconds'])) ? 1 :
  parseInt(config['mongo-cache-seconds']),
  client;

let connect = bb.promisify(function(cb) {
  if (client) {
    return cb(null, client);
  } else {
    return MongoClient.connectAsync(config['mongo-url'])
      .then(function(db) {
        client = db.collection('issues');
        console.log('ISSUES: connected to Mongo');
        return cb(null, client);
      })
      .catch(cb);
  }
});

export function* get(ids) {
  let db = yield connect();
  let issues = yield db.find( { github_id: { $in: ids } } ).toArray();
  if (issues) {
    return issues;
  }
}
