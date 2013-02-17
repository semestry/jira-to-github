var JiraApi = require('jira').JiraApi;
var GitHubApi = require('github');
//var util = require('util');

// The GitHub API handles concurrent inserts really badly
// Guess they are using optimistic locking without retry, or something like that
// Serializing requests fixes the issue
var https = require('https');
https.globalAgent.maxSockets = 1;

var config = require('./config');

var jira = new JiraApi(config.jira.proto, config.jira.host, config.jira.port, config.jira.user, config.jira.password, '2');
var github = new GitHubApi({ version: "3.0.0" });
github.authenticate({
    type: "basic",
    username: config.github.user,
    password: config.github.password
});

jira.searchJira(config.jira.jql, 
		{ 	
			maxResults: 9999, 
			fields: [ 'summary', 'description', 'priority', 'components', 'issuetype' ] 
		}, function(error, result) {

	result.issues.forEach(function(issue) {

		labels = [];

		if([ 'Blocker', 'Critical' ].indexOf(issue.fields.priority.name) >= 0)
			labels.push( 'prio:high' );

		issue.fields.components.forEach(function(component) {
			switch(component.name) {
			  case 'API':
				labels.push( 'comp:api' );
				break;
			  case 'Back end general':
				labels.push( 'comp:backend' );
				break;
			  case 'Build process':
				labels.push( 'comp:build-process' );
				break;
			  case 'Datasource: S+':
				labels.push( 'comp:datasource-syllabus' );
				break;
			  case 'Documentation':
				labels.push( 'comp:documentation' );
				break;
			  case 'Front end / GWT':
				labels.push( 'comp:gwt' );
				break;
			  case 'Help':
				labels.push( 'comp:help' );
				break;
			  case 'Mobile':
				labels.push( 'comp:mobile' );
				break;
			}
		});

		switch(issue.fields.issuetype.name) {
		  case 'Bug':
			labels.push( 'type:bug' );
			break;
		  case 'Improvement':
			labels.push( 'type:enhancement' );
			break;
		  case 'New Feature':
			labels.push( 'type:feature' );
			break;
		  case 'Task':
			labels.push( 'type:task' );
			break;

		}

		github.issues.create({
		user: config.github.repouser,
		repo: config.github.reponame, 
		title: issue.fields.summary,
		body: issue.fields.description,
		labels: labels
		} , function(err, res) { 
			if(err)
				console.log("Error creating issue: " + issue.fields.summary);
			else
				console.log("Created issue: " + issue.fields.summary);
		})

		//console.log(util.inspect(issue, false, null));

	})

});