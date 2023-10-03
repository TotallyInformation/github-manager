# GitHub Manager

GitHub Manager is a set of command-line executables that help you manage
GitHub. Specifically GitHub Organisations and Teams.

## Pre-requisites

1) Installation of Node.JS and NPM.

## Installation

Install globally in order to be able to use the commands from any command line.
This should work on any operating system supported by Node.JS including Windows, MacOS and Linux.

```
npm install TotallyInformation/github-manager -g
```

## Configuration

A file called _config.yaml is required.

## Commands

### ghlistteams (`scripts/list-teams-in-org.js`)

List the teams in an Organisation

### ghaddusers (`scripts/add-users-to-team.js`)

Add one or many GitHub users to a Team in an organisation.

If users do not yet belong to the organisation, they will be sent an 
invitation and their status marked as "pending" until they accept.

Users who have accepted the invitation are marked with a status of "active".
