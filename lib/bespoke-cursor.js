module.exports = function(opts) {
  require('insert-css')('.bespoke-cursor-idle,.bespoke-cursor-idle *{cursor:none!important}')
  return function(deck) {
    opts = opts ? (typeof opts === 'number' ? { timeout: opts } : opts) : {};
    var timeout = opts.timeout || 1000,
      expiry,
      hide = function() {
        deck.parent.classList.add('bespoke-cursor-idle');
        expiry = undefined;
      },
      schedule = function() {
        deck.parent.classList.remove('bespoke-cursor-idle');
        if (expiry) clearTimeout(expiry);
        expiry = setTimeout(hide, timeout);
      };
    deck.on('destroy', function() {
      removeEventListener('mousemove', schedule, false);
      if (expiry) clearTimeout(expiry);
    });
    schedule();
    document.addEventListener('mousemove', schedule, false);
  };
};
