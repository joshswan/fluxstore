/*!
 * Copyright 2016 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/fluxstore/blob/master/LICENSE
 */
'use strict';

const EventEmitter = require('events').EventEmitter;

module.exports = function(methods, changeEvent) {
  let CHANGE_EVENT = changeEvent || 'change';

  let events = {
    emitChange: function(...args) {
      this.emit(CHANGE_EVENT, ...args);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    disableRefresh: function() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);

        this.refreshTimer = null;
      }
    },
    enableRefresh: function(delay) {
      this.refreshTimer = setInterval(() => {
        this.shouldRefresh() && this.refresh && this.refresh();
      }, delay);
    },
    shouldRefresh: function() {
      return true;
    },
  };

  return Object.assign({}, EventEmitter.prototype, events, methods);
};
