'use strict';

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var redis = require('redis');

var client = _redis2.default.createClient(6379, '127.0.0.1');

var lpush = function lpush(key, value) {
    return new Promise(function (resolve, reject) {
        client.multi().select(0).lpush(key, value).expire(key, 10).exec(function (error, result) {
            if (error) return reject(error);else return resolve(result);
        });
    });
};

var call = async function call(key, value) {
    console.log((await lpush(key, value)));
    process.exit();
};
call('t', 123);
lpush('t', 123).then(function (val) {
    console.log(val);
});