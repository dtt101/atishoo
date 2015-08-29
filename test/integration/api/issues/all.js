import assert from 'assert';
import sinon from 'sinon';
import agent from 'supertest-koa-agent';
import proxyquire from 'proxyquire';
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
          assert.strictEqual(res.body[0].test, 1);
          done(err);
        });
    });
  });
});

function issuesList() {
  return [{
    test: 1
  }];
}
