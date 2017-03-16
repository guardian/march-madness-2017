var $ = require('../vendor/jquery.js');
var share = require('../modules/share.js');
var vlq = require('vlq');

var pageUrl = document.location.href.split('#')[0],
    id = document.location.href.split('#')[1];

module.exports =  {
    updateUrl: function() {
        history.pushState('', document.title, pageUrl + '#' + this.getData());
        share.setLinks('.march-bar', true);
    },

    getData: function() {
        var data = [];
        $(this.orderMatchups()).each(function() {
            if ($(this).find('.is-winner').length) {
                if ($(this).find('.is-winner').is(':first-of-type')) {
                    data.push(1);
                } else {
                    data.push(2);
                }
            } else {
                data.push(3);
            }
        });

        data = data.join('').match(/.{1,8}/g);
        console.log(data);
        console.log('hey');
        return vlq.encode(data);
    },

    parseData: function(id) {
        return vlq.decode(id).join('').split('');
    },

    orderMatchups: function() {
        var $matchups = $();

        for (var round = 1; round < 8; round++) {
            $('.march-round[data-region="1"][data-round="'+ round + '"] .march-bracket__matchup').each(function(index, element) {
                $matchups.push.apply($matchups, $(element));
            });
            $('.march-round[data-region="3"][data-round="'+ round + '"] .march-bracket__matchup').each(function(index, element) {
                $matchups.push.apply($matchups, $(element));
            });
            $('.march-round[data-region="2"][data-round="'+ round + '"] .march-bracket__matchup').each(function(index, element) {
                $matchups.push.apply($matchups, $(element));
            });
            $('.march-round[data-region="4"][data-round="'+ round + '"] .march-bracket__matchup').each(function(index, element) {
                $matchups.push.apply($matchups, $(element));
            });
        }

        for (var round = 5; round < 8; round++) {
            $('.march-round[data-round="' + round + '"] .march-bracket__matchup').each(function(index, element) {
                $matchups.push.apply($matchups, $(element));
            })
        }

        return $matchups;
    }
}