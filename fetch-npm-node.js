"use strict";

var nodeFetch = require("node-fetch");
// deal with node-fetch being exposed as main and module
// check https://github.com/lquixada/cross-fetch/issues/15
var realFetch = nodeFetch.default || nodeFetch;

module.exports = function (url, options) {
	if (/^\/\//.test(url)) {
		url = "https:" + url;
	}
	return realFetch.call(this, url, options);
};

if (!global.fetch) {
	global.fetch = module.exports;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}
