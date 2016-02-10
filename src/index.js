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
    emitChange: (...args) => {
      this.emit(CHANGE_EVENT, ...args);
    },
    addChangeListener: (callback) => {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: (callback) => {
      this.removeListener(CHANGE_EVENT, callback);
    },
  };

  return Object.assign({}, EventEmitter.prototype, options, methods);
};
