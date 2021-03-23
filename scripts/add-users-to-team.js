#!/usr/bin/env node

/**
 * Add one or more users to a GitHub Organisation Team.
 * 
 * Requires a configuration file `./_config.yaml` containing:
 * - The organisation id
 * - The team id
 * - A list of pairs of:
 *   - The GitHub user id to add
 *   - The role to give that user in the team (member|maintainer)
 * 
 * Any user not already a member of the organisation will be invited automatically and their state set to "pending".
 * 
 * Response Status/States:
 * - 200/'pending' - User is not yet a member of the organisation but has been invited automatically.
 * - 200/'active' - User is already a member or has been successfully added.
 * - 403/'forbidden' - Team is set to use enterprise identity sync.
 * - 422/'Unprocessable Entity' - Atempt to add an Organisation to a team instead of a user.
 * 
 * See https://docs.github.com/en/rest/reference/teams#add-or-update-team-membership-for-a-user for more information.
 * 
 * Copyright (c) 2021 Julian Knight (TotallyInformation), all rights reserved
 * License: MIT
 */

const {config, octokit} = require('../lib/utils.js')

// octokit.hook.after("request", async (response, options) => {
//     //console.log({options})
//     console.log(`   User: ${options.username}. Response: Status=${response.status}, State=${response.data.state}, Role=${response.data.role}`)
// })

// Note, we cannot use forEach with promises. We can use old-school loops or maps
// - with a map, we have to wait for all the promises to finish to get final data
const mapLoop = async _ => {
    console.log(`\nAdding ${config.userList.length} user${config.userList.length<2?'':'s'} to Team "${config.team}" in Organisation "${config.org}":\n`)

    const promises = config.userList.map( async user => {
        const response = await octokit.request('PUT /orgs/{org}/teams/{team_slug}/memberships/{username}', {
            org: config.org,
            team_slug: config.team,
            username: user.id,
            role: user.role,
        })

        // @ts-expect-error ts(2339) - definition of response.data doesn't include .id
        response.data.id = user.id
        // @ts-expect-error ts(2339) - definition of response.data doesn't include .status
        response.data.status = response.status

        return response.data
    })

    const results = await Promise.all(promises)

    console.table(results, ['id','status','state','role'])

    console.log(`\n======== Finished Adding users ========\n`)
}

mapLoop()