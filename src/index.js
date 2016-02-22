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
    getListenerCount: function() {
      return this.listenerCount(CHANGE_EVENT);
    },
    hasListeners: function() {
      return !!this.getListenerCount();
    },
    isExpired: function(timestamp, maxage) {
      return timestamp <= Date.now() - maxage * 1000;
    },
    disableRefresh: function() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);

        this.refreshTimer = null;
      }
    },
    enableRefresh: function(delay, immediate) {
      this.disableRefresh();

      this.refreshTimer = setInterval(() => {
        this._refresh();
      }, delay);

      if (immediate) {
        setImmediate(() => {
          this._refresh();
        });
      }
    },
    shouldRefresh: function() {
      return true;
    },
    _refresh: function() {
      this.shouldRefresh() && this.refresh && this.refresh();
    },
  };

  return Object.assign({}, EventEmitter.prototype, events, methods);
};
