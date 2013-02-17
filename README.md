JIRA to GitHub issues converter
===============================

This is a tiny, simple, hacky node.js Jira to GitHub issues converter. It uses the GitHub REST API v3 and the JIRA REST API v2, and the `github` and `jira` node modules. It does not import comments, owner, assignment, and a lot of other stuff, but can serve as a starting point for anyone moving to GitHub issues (yeah, I know, JIRA is much better, but we're cheap and don't need all the bells and whistles).

Usage
-----

 1. Clone this repo.
 2. Install node.js/npm.
 3. `npm install github jira`
 4. Edit config.js, it includes the JQL query used to find the issues to import.
 5. Edit jira-to-github.js to fix the status/component/label mapping.
 6. `node jira-to-github.js`

