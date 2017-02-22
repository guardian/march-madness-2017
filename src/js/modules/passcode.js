var $ = require('../vendor/jquery.js');
var md5 = require('md5');

var data = [],
    pageUrl = document.location.href.split('#')[0];

module.exports =  {
    init: function() {
        this.updateUrl();
    },

    updateUrl: function() {
        history.pushState('', document.title, pageUrl + '#' + this.getData());
    },

    getData: function() {
        $('.march-bracket__matchup').each(function() {
            data.push({
               region: $(this).parent().attr('data-region'),
               round: $(this).parent().attr('data-round'),
               matchNumber: $(this).attr('data-match-number'),
               teams: [{
                   isFilled: $(this).find('.march-bracket__team:first-of-type').hasClass('is-filled'),
                   team: $(this).find('.march-bracket__team:first-of-type').attr('data-team')
               },
               {
                   isFilled: $(this).find('.march-bracket__team:last-of-type').hasClass('is-filled'),
                   team: $(this).find('.march-bracket__team:last-of-type').attr('data-team')
               }]
            });
        });

        return md5(data);
    }
}