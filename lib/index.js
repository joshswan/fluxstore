/*!
 * Copyright 2015 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/fluxstore/blob/master/LICENSE
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var EventEmitter = require('events').EventEmitter;

module.exports = function (options, changeEvent) {
  var CHANGE_EVENT = changeEvent || 'change';

  var methods = {
    emitChange: function emitChange() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.emit.apply(this, [CHANGE_EVENT].concat(args));
    },
    addChangeListener: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  };

  return _extends({}, EventEmitter.prototype, options, methods);
};