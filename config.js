var config = {};
config.jira = {};
config.github = {};

config.jira.proto = 'https';
config.jira.host = 'jira.eveoh.nl';
config.jira.port = 443;
config.jira.user = 'yourjirauser';
config.jira.password = 'yourjirapass';
config.jira.jql = 'project = MTT AND resolution = Unresolved';

config.github.user = 'yourgithubuser'
config.github.password = 'yourgithubpass'
config.github.repouser = 'eveoh'
config.github.reponame = 'myrepo'

module.exports = config;