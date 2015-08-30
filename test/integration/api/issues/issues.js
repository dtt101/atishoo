import assert from 'assert';
import sinon from 'sinon';
import agent from 'supertest-koa-agent';
import monk from 'monk';
import wrap from 'co-monk';
import proxyquire from 'proxyquire';

import config from '../../../../app/config';

proxyquire.noCallThru();

let anonFunc = () => {};
let GitHubApi = new anonFunc();

let GitHubApiMock = () => {
  return GitHubApi;
};
GitHubApiMock['@global'] = true;

const subject = () => {
  return agent(proxyquire('../../../../app/app', {
    github: GitHubApiMock
  }));
};

let url = config['mongo-test-url'],
  client;
let db = monk(url);
client = wrap(db.get('issues'));

describe('INTEGRATION issues', () => {

  describe('GET /api/issues', () => {

    before(() => {
      GitHubApi.issues = sinon.stub();
      GitHubApi.issues.repoIssues = sinon.stub().yieldsAsync(null, issuesList());
    });

    it('should return a list of issues', (done) => {
      subject()
        .get('/api/issues')
        .expect(200)
        .end((err, res) => {
          assert.strictEqual(err, null);
          assert.strictEqual(res.body[0].test, "test");
          done(err);
        });
    });

    it('should return a list of issues with extra information', (done) => {
      subject()
        .get('/api/issues')
        .expect(200)
        .end((err, res) => {
          assert.strictEqual(err, null);
          assert.strictEqual(res.body[0].test, "test");
          // assert.strictEqual(res.body[0].extra, 1); //TODO: insert into mongo
          done(err);
          });
    });
  });

  describe('PATCH /api/issues/:id', () => {

    // TODO: clean DB before and after, stub existing issue and test that too

    it('should patch an issue that does not exist in the local db', (done) => {
      subject()
        .patch('/api/issues/1')
        .send({data: {type: 'issues', id: 3, attributes: {workflow: 'test'}}})
        .expect(204)
        .end((err, res) => {
          done(err);
        });
    });
  });
});

function issuesList() {
  return [{
    test: "test",
    github_id: 1
  }];
}
