import { promisifyAll, promisify } from 'bluebird';
import GitHubApi from 'github';

function* getClient() {
  let client = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000,
    headers: {
        "user-agent": "atishoo"
    }
  });
  return client;
}

export function* getIssues() {
  console.log('get issues called');
  let github = yield * getClient();
  let repoIssues = promisify(github.issues.repoIssues);
  let issues = yield repoIssues({
      user: "dtt101", // TODO: move user to config
      repo: "atishoo" // TODO: get repo from parameters/url
  });
  return issues;
}
