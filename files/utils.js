const fs = require('fs');

module.exports = {


    /**
     * @Others
     * */

    sleep: function(n) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
    }

};
