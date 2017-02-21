var request = require('sync-request');
var fs = require('fs-extra');

var data, furniture;

module.exports = function getData(explainer) {
    data = require('../../scripts/local.json');

    return data;
};