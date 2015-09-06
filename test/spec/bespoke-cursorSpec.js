Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke'),
  cursor = require('../../lib/bespoke-cursor.js');

describe('bespoke-cursor', function() {

  var deck,
    createDeck = function(opts) {
      var parent = document.createElement('article');
      for (var i = 0; i < 5; i++) {
        var section = document.createElement('section');
        parent.appendChild(section);
      }

      document.body.appendChild(parent);

      deck = bespoke.from(parent, [
        cursor(opts)
      ]);
    },
    destroyDeck = function() {
      deck.fire('destroy');
      deck.parent.parentNode.removeChild(deck.parent);
      deck = null;
    };

  afterEach(destroyDeck);

  [undefined, 250].forEach(function(timeout) {
    describe('cursor timeout with value ' + timeout, function() {

      beforeEach(function() {
        createDeck(timeout);
      });

      it('should hide cursor after timeout', function(done) {
        expect(getComputedStyle(deck.parent).cursor).toBe('auto');
        setTimeout(function() {
          expect(deck.parent.style.cursor).toBe('none');
          done();
        }, (timeout || 1000));
      });
    });
  });
});
