module.exports = Object.freeze({
    // where to listen JIRA webhooks
    port: 4100,
    // a language bot talks to users in
    lang: 'en',
    // jira params
    jira: {
        url: 'https://bingoboom.atlassian.net',
        // url: 'https://jira.bingo-boom.ru/jira',
        user: 'jira_bot_cloud@bingo-boom.com',
        password: 'wgQklnSIkAOOe2PufsiNEC22',
    },
    // list of available actions for current user
    features: {
        // create room
        createRoom: true,
        // invite new member in room
        inviteNewMembers: true,
        // post comment in Riot
        postComments: true,
        // create/update issue in jira and associated room in Riot
        postIssueUpdates: true,
        // create/update epic in jira and associated room in Riot
        epicUpdates: {
            newIssuesInEpic: 'on',
            issuesStatusChanged: 'on',
            field: 'customfield_10006',
            fieldAlias: 'Epic Link',
        },
        // create new associated in Riot with other rooms (issue in Jira)
        newLinks: true,
        // update links in Riot with other rooms (issue in Jira)
        postChangesToLinks: {
            on: true,
            // Not to post to closed issues (3 - id of status category "Done")
            ignoreDestStatusCat: [3],
        },
    },
    // useful for testing, add a test user into production config
    usersToIgnore: ['jira_test'],
    // list of users which will be avoided in inviting to room in matrix
    inviteIgnoreUsers: [],
    testMode: {
        on: true,
        users: ['jira_test', 'jira_test_bot'],
    },
    // redis params
    // redis: {
    //     host: 'jira_bot_redis',
    //     port: 6379,
    //     prefix: 'jira-hooks:',
    // },
    redis: {
        host: 'redis',
        port: 6379,
        prefix: 'jira-hooks:',
    },
    // Matrix params
    messenger: {
        // users with admin status
        admins: ['gv_grudinin'],
        // messenger name
        name: 'matrix',
        // messenger domain
        domain: 'matrix.bingo-boom.ru',
        // short name, before colomn, without @
        // user: 'health_check_bot',
        // password: 'i2CRrNSaHUYH5lQyh1Hg',
        // user: 'jira_test_bot',
        // password: 'xL1BI3ChW2db7N',

        // bots: [
        //     {
        //         user: 'jira_bot_keeper',
        //         password: 'EhSTk27CmfcHsYES9C4V',
        //         //         user: 'bot2',
        //         //         password: 'key',
        //     },
        //     //     {
        //     //         user: 'bot3',
        //     //         password: 'key',
        //     //     },
        // ],
        // info room
        // optional
        infoRoom: {
            // users that will be in info room
            // if no field, admins will be added
            users: ['gv_grudinin'],
            // room alias in chat
            name: 'INFO10',
        },
    },
    // log params based on winston https://github.com/winstonjs/winston
    log: {
        // type of log output
        type: 'both',
        // path to log file
        filePath: 'logs/service',
        // log level saved in file
        fileLevel: 'silly',
        // log level in console
        consoleLevel: 'silly',
    },
    // Optional reconnect data
    ping: {
        // interval reconnect by default 500
        interval: 10,
        // how many times tring reconnect by default 10
        count: 10,
    },
    // colors links to update according to every color in jira
    // you must upload it before and get links to set them here
    // Optionally
    colors: {
        //
        links: {
            // This link used when you create room
            issue: 'mxc://matrix.example/purple',
            // colors, at least green, yellow, blue-gray must be
            green: 'mxc://matrix.example/green',
            yellow: 'mxc://matrix.example/yellow',
            'blue-gray': 'mxc://matrix.example/blue-gray',
            // additional is possible according to your custom jira color
            purple: 'mxc://matrix.example/purple',
        },
        // Projects to use
        // You can use this action for some projects only
        // if you want to set all - projects: 'all'
        // if you want to SKIP for all - just don't use this field or skip colors
        projects: ['TEST'],
    },
    // gitArchive: {
    //     user: 'matrix_gitlab_bot',
    //     password: 'hole_scorn2Alicehole_scorn2Alice',
    //     repoPrefix: 'vcs.bingo-boom.ru/matrix_archive',
    // },
    gitArchive: {
        user: 'git_test',
        password: 'test_passw0rd',
        repoPrefix: `localhost:${settings.gitServerPort}/test`,
        protocol: 'http',
    },
});