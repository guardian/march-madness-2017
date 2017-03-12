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

function createImageNames() {
    for (var i = 0; i < json.length; i++) {
        json[i].Logo = json[i].Team.replace(/ /g, '-').replace('\'', '').toLowerCase();
    }
}

function isDouble() {
    for (var i = 0; i < json.length; i++) {
        if (json[i].Team.indexOf('/') != -1) {

            json[i].isDouble = true;
        }
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
    createImageNames();
    isDouble();
    sortTeams();

    return data;
};