(function() {
  $(document).ready(function() {
    var hamburger_cross, isClosed, overlay, trigger;
    trigger = $('.hamburger');
    overlay = $('.overlay');
    isClosed = false;
    hamburger_cross = function() {
      if (isClosed === true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    };
    trigger.click(function() {
      hamburger_cross();
    });
    $('[data-toggle="offcanvas"]').click(function() {
      $('#wrapper').toggleClass('toggled');
    });
  });

}).call(this);
