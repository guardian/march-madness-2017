var $ = require('../vendor/jquery.js');
var vlq = require('vlq');

var pageUrl = document.location.href.split('#')[0],
    id = document.location.href.split('#')[1];

module.exports =  {
    init: function() {
        if (id) {
            this.parseData(id);
        }
    },

    updateUrl: function() {
        history.pushState('', document.title, pageUrl + '#' + this.getData());
        this.parseData(this.getData());
    },

    getData: function() {
        var data = [];
        $('.march-bracket__matchup').each(function() {
            if ($(this).find('.is-winner').length) {
                if ($(this).find('.is-winner').is(':first-of-type')) {
                    data.push(1);
                } else {
                    data.push(2);
                }
            } else {
                data.push(0);
            }
        });

        data = data.join('').match(/.{1,8}/g);
        return vlq.encode(data);
    },

    parseData: function(data) {
        console.log(vlq.decode(data));
    }
}