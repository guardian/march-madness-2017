var request = require('sync-request');
var fs = require('fs-extra');

var json,
    data = {regions: {}},
    conferences = [];

function sortTeams() {
    var conferenceNum = -1;
    for (var i = 0; i < json.length; i++) {

        if (conferences.indexOf(json[i].Conference) > -1) {
            console.log('match');
        } else {
            conferenceNum += 1;
            conferences.push(json[i].Conference);
            console.log('non match');
        }

        if (data.regions[conferenceNum] === undefined) {
            data.regions[conferenceNum] = {};
            data.regions[conferenceNum].region = json[i].Conference;
            data.regions[conferenceNum].teams = [];
        }
        data.regions[conferenceNum].teams.push(json[i]);
    }
}

function htmlFormatting() {
    for (var i = 0; i < json.length; i++) {
        
    }
}

module.exports = function getData() {
    json = require('../../scripts/local.json');
    json = json.sheets.Sheet1;

    sortTeams();
    htmlFormatting();

    console.log(data);

    return data;
};