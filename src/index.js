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
    disableRefresh: function() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);

        this.refreshTimer = null;
      }
    },
    enableRefresh: function(delay, immediate, force) {
      this.disableRefresh();

      this.refreshTimer = setInterval(() => {
        this._refreshIfNeeded();
      }, delay);

      if (immediate) {
        setImmediate(() => {
          this._refreshIfNeeded(force);
        });
      }
    },
    _shouldRefresh: function() {
      return true;
    },
    _refreshIfNeeded: function(force) {
      (force || this._shouldRefresh()) && this.refresh && this.refresh();
    },
  };

  return Object.assign({}, EventEmitter.prototype, events, methods);
};
