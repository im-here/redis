var redis = require('redis');
var Promise = require('bluebird');

var client = redis.createClient(6379, '127.0.0.1');

// var robot = [1001, -151, 1001, -152];

// var zadd = function (key) {
//     return new Promise(function (resolve, reject) {
//         client.zadd(key, robot, function (error, reply) {
//             if (error)
//                 return reject(error);
//             resolve(reply);
//         });
//     });
// };

(function () {
    var date = new Date();

    // zadd('rank.1').then(function (val) {
    //     console.log(val);
    //     console.log('time:', new Date() - date);
    //     // process.exit(0);
    // }).catch(function (error) {
    //     console.error(error);
    //     // process.exit(0);
    // });
    console.log('123');
})();
