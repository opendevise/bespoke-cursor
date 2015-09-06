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
