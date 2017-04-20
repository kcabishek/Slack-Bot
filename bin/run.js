'use strict';

const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);
const slackClient = require('../server/slackClient');

const witToken = 'API Key';
const witClient = require('../server/witclient')(witToken);
const slackToken = "API Key";
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken,slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function(){

    console.log(`Storm is listening on port ${server.address().port} in ${service.get('env')} mode.`);
});