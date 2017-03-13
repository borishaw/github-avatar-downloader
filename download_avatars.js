var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const GITHUB_USER = 'borishaw';
  const GITHUB_TOKEN = '2aa45aaa76c254fb67affa95fb9073ee8b70a90c';

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'borishaw/github-avatar-downloader'
    }
  };
  request.get(requestOptions, function (error, response, body) {
    cb(error, body)
  })
    
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var avatarArray = [];
  var counter = 0;
  var result = JSON.parse(result);
  for (counter; counter < result.length; counter++){
    avatarArray.push(result[counter].avatar_url);
  }
  console.log(avatarArray);
});