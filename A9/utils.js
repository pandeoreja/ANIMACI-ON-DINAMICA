window.utils = window.utils || {};

/**
 * Captures mouse coordinates relative to the target element.
 * @param {HTMLElement} element 
 * @return {Object} 
 */
window.utils.captureMouse = function (element) {
  var mouse = { x: 0, y: 0, event: null };

  element.addEventListener('mousemove', function (event) {
    var rect = element.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.event = event;
  }, false);

  return mouse;
};

/**
 * Captures touch coordinates relative to the target element.
 * @param {HTMLElement} element 
 * @return {Object} 
 */
window.utils.captureTouch = function (element) {
  var touch = { x: null, y: null, isPressed: false, event: null };

  function updateTouch(event) {
    if (event.touches.length > 0) {
      var rect = element.getBoundingClientRect();
      var touch_event = event.touches[0];
      touch.x = touch_event.clientX - rect.left;
      touch.y = touch_event.clientY - rect.top;
    }
    touch.event = event;
  }

  element.addEventListener('touchstart', function (event) {
    touch.isPressed = true;
    updateTouch(event);
  }, false);

  element.addEventListener('touchend', function (event) {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  }, false);

  element.addEventListener('touchmove', function (event) {
    updateTouch(event);
  }, false);

  return touch;
};