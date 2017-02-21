var request = require('sync-request');
var fs = require('fs-extra');

var json, data = {};

function sortTeams() {
    for (var i = 0; i < json.length; i++) {
        if (data[json[i].Conference] === undefined) {
            data[json[i].Conference] = [];
        }
        data[json[i].Conference].push(json[i]);
    }
}

module.exports = function getData() {
    json = require('../../scripts/local.json');
    json = json.sheets.Sheet1;

    sortTeams();

    return data;
};