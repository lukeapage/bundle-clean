'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var content = _fs2['default'].readFileSync('./test/fixture/less2css-bundle-in.js');

content = _index2['default'](content);

_fs2['default'].writeFileSync('./test/fixture/less2css-bundle-gen.js', content);