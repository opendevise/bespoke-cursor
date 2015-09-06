/*!
 * bespoke-cursor v1.0.0
 *
 * Copyright 2015, Dan Allen
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.cursor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(opts) {
  return function(deck) {
    opts = opts ? (typeof opts === 'number' ? { timeout: opts } : opts) : {};
    var timeout = opts.timeout || 1000,
      expiry,
      hide = function() {
        deck.parent.style.cursor = 'none';
        expiry = undefined;
      },
      schedule = function() {
        deck.parent.style.cursor = '';
        if (expiry) clearTimeout(expiry);
        expiry = setTimeout(hide, timeout);
      };
    schedule();
    document.addEventListener('mousemove', schedule, false);
    deck.on('destroy', function() {
      removeEventListener('mousemove', schedule, false);
      if (expiry) clearTimeout(expiry);
    });
  };
};

},{}]},{},[1])(1)
});