'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb){

    if(intentData.intent[0].value !== 'time'){
            return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }

    if(!intentData.location){
        return cb(new Error('Missing location in time intent'));
    }

    const location = intentData.location[0].value;
    request.get(`http://localhost:3010/service/${location}`, (err,res) => {

        if(err || res.statusCode !== 200 || !res.body.result){
            console.log(err);
            console.log(res.body);

            return cb(null, `I had a problem finding the time in ${location}`);
        }

        return cb(null, `In ${location}, it is now ${res.body.result}`);
    });
    //return cb(`I don't know the time yet in ${intentData.location[0].value}`);
}