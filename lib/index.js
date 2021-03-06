/*!
 * Copyright 2016 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/fluxstore/blob/master/LICENSE
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var EventEmitter = require('events').EventEmitter;

module.exports = function (methods, changeEvent) {
  var CHANGE_EVENT = changeEvent || 'change';

  var events = {
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
    },
    getListenerCount: function getListenerCount() {
      return this.listenerCount(CHANGE_EVENT);
    },
    hasListeners: function hasListeners() {
      return !!this.getListenerCount();
    },
    disableRefresh: function disableRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);

        this.refreshTimer = null;
      }
    },
    enableRefresh: function enableRefresh(delay, immediate, force) {
      var _this = this;

      this.disableRefresh();

      this.refreshTimer = setInterval(function () {
        _this._refreshIfNeeded();
      }, delay);

      if (immediate) {
        setImmediate(function () {
          _this._refreshIfNeeded(force);
        });
      }
    },
    _shouldRefresh: function _shouldRefresh() {
      return true;
    },
    _refreshIfNeeded: function _refreshIfNeeded(force) {
      (force || this._shouldRefresh()) && this.refresh && this.refresh();
    }
  };

  return _extends({}, EventEmitter.prototype, events, methods);
};