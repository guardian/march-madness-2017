var request = require('sync-request');
var fs = require('fs-extra');

var json,
    data = {regions: {}},
    conferences = [];

function breakDoubleTeams() {
    for (var i = 0; i < json.length; i++) {
        json[i].Team = json[i].Team.replace('/', '/ <br/>');
    }
}

function sortTeams() {
    var conferenceNum = -1;
    for (var i = 0; i < json.length; i++) {

        if (conferences.indexOf(json[i].Conference) > -1) {

        } else {
            conferenceNum += 1;
            conferences.push(json[i].Conference);
        }

        if (data.regions[conferenceNum] === undefined) {
            data.regions[conferenceNum] = {};
            data.regions[conferenceNum].region = json[i].Conference;
            data.regions[conferenceNum].teams = [];
        }

        data.regions[conferenceNum].teams.push(json[i]);
    }
}

module.exports = function getData() {
    json = require('../../scripts/local.json');
    json = json.sheets.Sheet1;

    breakDoubleTeams();
    sortTeams();

    return data;
};