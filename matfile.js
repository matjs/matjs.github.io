var mat   = require('mat');
var opoa  = require('mat-opoa');

mat.task('default', function () {
    mat.use(opoa({
        root: './'
    }));
})