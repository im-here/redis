'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var movieDir = __dirname + '/movies',
    exts = ['.mkv', '.avi', '.mp4', '.rm', '.rmvb', '.wmv'];

// 读取文件列表
var readFiles = function readFiles() {
    return new Promise(function (resolve, reject) {
        _fs2.default.readdir(movieDir, function (err, files) {
            resolve(files.filter(function (v) {
                return exts.includes(_path2.default.parse(v).ext);
            }));
        });
    });
};

// 获取海报
var getPoster = function getPoster(movieName) {
    var url = 'https://api.douban.com/v2/movie/search?q=' + encodeURI(movieName);

    return new Promise(function (resolve, reject) {
        (0, _request2.default)({ url: url, json: true }, function (error, response, body) {
            if (error) return reject(error);

            resolve(body.subjects[0].images.large);
        });
    });
};

// 保存海报
var savePoster = function savePoster(movieName, url) {
    _request2.default.get(url).pipe(_fs2.default.createWriteStream(_path2.default.join(movieDir, movieName + '.jpg')));
};

(async function () {
    var files = await readFiles();

    // await只能使用在原生语法
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var file = _step.value;

            var name = _path2.default.parse(file).name;

            console.log('\u6B63\u5728\u83B7\u53D6\u3010' + name + '\u3011\u7684\u6D77\u62A5');
            savePoster(name, (await getPoster(name)));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log('=== 获取海报完成 ===');
})();