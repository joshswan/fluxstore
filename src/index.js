/*!
 * Copyright 2015 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/fluxstore/blob/master/LICENSE
 */
'use strict';

const EventEmitter = require('events').EventEmitter;

module.exports = function(options, changeEvent) {
  let CHANGE_EVENT = changeEvent || 'change';

  let methods = {
    emitChange: function(...args) {
      this.emit(CHANGE_EVENT, ...args);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
  };

  return Object.assign({}, EventEmitter.prototype, options, methods);
};
