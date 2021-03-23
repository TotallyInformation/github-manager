/**
 * Copyright (c) 2021 Julian Knight (TotallyInformation), all rights reserved
 * License: MIT
 */

const {config, octokit} = require('./lib/utils.js')

//const octokit = new Octokit({ auth: config.accessToken });

octokit.hook.after("request", async (response, options) => {
    //console.log({response, options})
    console.log({options})

    if (response.data) {
        if (Array.isArray(response.data)) {
            response.data.forEach(item => {
                console.dir({item}, {colors:true})
                // if ( item.name ) {
                //     console.log(`response.data.name: ${item.name}`)
                // } else {
                //     console.log({item})
                // }
            })    
        } else {
            console.log('response.data: ', response.data)
        }
    } else {
        console.log('response: ', response)
    }
})

//const response = await octokit.request("GET /orgs/{org}/repos", {
// octokit.request('GET /orgs/{org}/repos', {
//   org: config.org,
// })

// [List pending team invitations](https://docs.github.com/en/rest/reference/teams#list-pending-team-invitations)
// octokit.request('GET /orgs/{org}/teams/{team_slug}/invitations', {
//     org: config.org,
//     team_slug: config.team,
// })

// [List team members](https://docs.github.com/en/rest/reference/teams#list-team-members)
// octokit.request('GET /orgs/{org}/teams/{team_slug}/members', {
//     org: config.org,
//     team_slug: config.team,
// })

octokit.request('GET /orgs/{org}/teams', {
    org: config.org,
})