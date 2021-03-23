#!/usr/bin/env node

/**
 * List the teams that belong to a specific GitHub Organisation.
 * 
 * Comand: ghlistteams
 * 
 * Requires a configuration file `./_config.yaml` containing:
 * - The organisation id
 * 
 * See https://docs.github.com/en/rest/reference/teams#add-or-update-team-membership-for-a-user for more information.
 * 
 * Copyright (c) 2021 Julian Knight (TotallyInformation), all rights reserved
 * License: MIT
 */

const {config, octokit} = require('../lib/utils.js')

octokit.hook.after("request", async (response, options) => {
    //console.log({options})
    //console.log({response, options})

    console.log(`Organisation: "${options.org}"`)
    //console.log('"Team Name","Team ID"')

    if (response.data) {
        if (Array.isArray(response.data)) {
            const out = []
            response.data.forEach(item => {
                // console.dir({item})
                // console.log(`"${item.name}","${item.slug}"`)
                out.push({
                    "Team ID": item.slug,
                    "Team Name": item.name,
                })
            })
            console.table(out)
            // console.table(response.data, ['name', 'slug'])
        } else {
            console.log('response.data: ', response.data)
        }
    } else {
        console.log('response: ', response)
    }
})

octokit.request('GET /orgs/{org}/teams', {
    org: config.org,
})