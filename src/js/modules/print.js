var $ = require('../vendor/jquery.js');
var jsPDF = require('jspdf');

module.exports =  {
    init: function() {
        this.bindings();
        this.showPrintButtons();
    },

    bindings: function() {
        $('.march-header__print-button, .march-bar__print-button').click(function() {
            this.generateCanvas();
        }.bind(this));
    },

    showPrintButtons: function() {
        $('.march-header__print-button, .march-bar__print-button').addClass('is-printable');
    },

    exportBracket: function(imgData) {
        var pdf = new jsPDF({
            orientation: 'landscape',
            format: 'letter'
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, 279.4, 215.9);
        pdf.save('bracket.pdf');
    },

    generateCanvas: function() {
        console.log('canvaz');
        var canvas = document.getElementById('march-canvas');
        var ctx = canvas.getContext('2d');

        var img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = '@@assetPath@@/assets/images/printable-bracket.png';

        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            var data = this.getData();

            ctx.font = '14px "Guardian Sans Web"';

            for (var i = 0; i < data.length; i++) {
                ctx.fillText(data[i].team, data[i].x, data[i].y);
            }

            this.exportBracket(canvas.toDataURL('image/jpeg', 1.0));
        }.bind(this);
    },

    getData: function() {
        var data = [];
        var coords = [[40, 196], [40, 230], [40, 263], [40, 297], [40, 330], [40, 363], [40, 397], [40, 430], [40, 465], [40, 497], [40, 531], [40, 564], [40, 598], [40, 631], [40, 665], [40, 698], [200, 230], [200, 264], [200, 363], [200, 397], [200, 497], [200, 531], [200, 631], [200, 665], [360, 296], [360, 330], [360, 565], [360, 599], [520, 431], [520, 465], [1000 ,431], [1000, 465], [1160, 296], [1160, 330], [1160, 565], [1160, 599], [1320, 230], [1320, 264], [1320, 363], [1320, 397], [1320, 497], [1320, 531], [1320, 631], [1320, 665], [1480, 196], [1480, 230], [1480, 263], [1480, 297], [1480, 330], [1480, 363], [1480, 397], [1480, 430], [1480, 465], [1480, 497], [1480, 531], [1480, 564], [1480, 598], [1480, 631], [1480, 665], [1480, 698], [680, 447], [840, 447], [760, 698], [760, 732], [920, 720], [680, 984], [840, 984], [40, 732], [40, 765], [40, 799], [40, 832], [40, 866], [40, 899], [40, 933], [40, 966], [40, 1000], [40, 1033], [40, 1067], [40, 1100], [40, 1134], [40, 1167], [40, 1201], [40, 1235], [200, 766], [200, 800], [200, 900], [200, 934], [200, 1034], [200, 1068], [200, 1168], [200, 1202], [360, 833], [360, 867], [360, 1100], [360, 1134], [520, 968], [520, 1002], [1000, 968], [1000, 1002], [1160, 833], [1160, 867], [1160, 1100], [1160, 1134], [1320, 766], [1320, 800], [1320, 900], [1320, 934], [1320, 1034], [1320, 1068], [1320, 1168], [1320, 1202],  [1480, 732], [1480, 765], [1480, 799], [1480, 832], [1480, 866], [1480, 899], [1480, 933], [1480, 966], [1480, 1000], [1480, 1033], [1480, 1067], [1480, 1100], [1480, 1134], [1480, 1167], [1480, 1201], [1480, 1235]];

        $('.march-bracket__team').each(function() {
            data.push({
                isFilled: $(this).hasClass('is-filled'),
                isWinner: $(this).hasClass('is-winner'),
                team: $(this).find('.march-bracket__team-name').text(),
                x: coords[0][0],
                y: coords[0][1]
            });

            coords.shift();
        });

        return data;
    }
};