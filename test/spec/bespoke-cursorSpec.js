Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke'),
  cursor = require('../../lib/bespoke-cursor.js');

describe('bespoke-cursor', function() {

  var deck,
    setup = function() {
      var style = document.createElement('style');
      style.textContent = 'span.help{cursor:help}' +
      document.head.appendChild(style);
    },
    createDeck = function(opts) {
      var parent = document.createElement('article');
      for (var i = 0; i < 5; i++) {
        var section = document.createElement('section');
        var helpText = document.createElement('span');
        helpText.className = 'help';
        helpText.appendChild(document.createTextNode('text'));
        section.appendChild(helpText);
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

  beforeAll(setup);
  afterEach(destroyDeck);

  [undefined, 250].forEach(function(timeout) {
    describe('cursor timeout with value ' + timeout, function() {

      beforeEach(function() {
        createDeck(timeout);
      });

      it('should hide cursor after timeout', function(done) {
        var deckParent = deck.parent;
        var helpText = deckParent.querySelector('.help');
        expect(deckParent.classList).not.toContain('bespoke-cursor-idle');
        expect(getComputedStyle(deckParent).cursor).toBe('auto');
        expect(getComputedStyle(helpText).cursor).toBe('help');
        setTimeout(function() {
          expect(deckParent.classList).toContain('bespoke-cursor-idle');
          expect(getComputedStyle(deckParent).cursor).toBe('none');
          expect(getComputedStyle(helpText).cursor).toBe('none');
          done();
        }, (timeout || 1000));
      });
    });
  });
});
