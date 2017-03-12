var print = require('./modules/print.js');
var printFallback = require('./modules/printFallback.js');

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    printFallback.init();
} else {
    print.init();
}
