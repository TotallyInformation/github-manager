/**
 * Utility functions
 * 
 * Copyright (c) 2021 Julian Knight (TotallyInformation), all rights reserved
 * License: MIT
 */

const { Octokit } = require('@octokit/core')
const YAML = require('yaml')
const fs = require('fs')

const configFile = fs.readFileSync('./_config.yaml', 'utf8')
/**
 * @typedef {Object} Config YAML Configuration/options converted to a JS Object
 * @property {string} org Required. organisation
 * @property {string} team The team to examine/change - only needed if working with teams
 * @property {string} accessToken Personal access token. See https://github.com/settings/tokens/new?scopes=repo
 * @property {Array.<Object>} userList Details of a user to add to an organisation or team
 * @property {string} userList.id GitHub username
 * @property {"member"|"maintainer"} userList.role Role in the team: member|maintainer
 */

/** @type {Config} YAML Configuration/options converted to a JS Object */
let oConfig
try {
    oConfig = YAML.parse(configFile)
} catch (err) {
    console.error(err.message)
    process.exit(1)
}

//console.log({oConfig})

module.exports = {
    config: oConfig,
    octokit: new Octokit({ auth: oConfig.accessToken }),
}