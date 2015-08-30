import assert from 'assert';
import sinon from 'sinon';
import agent from 'supertest-koa-agent';
import monk from 'monk';
import co from 'co';
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

	afterEach(function() {
		co(cleanDb());
	});

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

  });

  describe('PATCH /api/issues/:id', () => {

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

function* cleanDb() {
  yield client.remove({});
}
