/**
 * ng-vibrate
 * version: 0.0.1
 * License: MIT
 */
(function() {

    angular.module("ngVibrate", ['ng']).directive("vbVibrate", function() {
        return {
            restrict: "AC",
            link: function(scope, element, attrs) {

                /* the string we get from attribute and converts to object  */
                var object = scope.$eval(attrs.vbVibrate || "{}");

                /* the vibrate properties */
                var y = (object.y == null) ? 2 : object.y ;
                var x = (object.x == null) ? 2 : object.x;
                var rotation = (object.rotation == null)? 0 : object.rotation;
                var speed = (object.speed == null) ? 10 : object.speed;
                var opacity = (object.opacity == null) ? 1 : object.opacity;
                var trigger = (object.trigger == null) ? "hover" : object.trigger;
                var interval;
                var clicked;

               /* the vibrate start function */
               var vibrate = function() {
                   rotation = toggleRotation(rotation);
                   element.context.style.position = "relative";
                   element.context.style.webkitTransform = 'rotate('+rotation+'deg)';
                   element.context.style['MozTransform']    = 'rotate('+rotation+'deg)';
                   element.context.style.msTransform     = 'rotate('+rotation+'deg)';
                   element.context.style.oTransform      = 'rotate('+rotation+'deg)';
                   element.context.style.transform       = 'rotate('+rotation+'deg)';
                   element.context.style.left = Math.round(Math.random() * x) - ((x + 1) / 2) +'px';
                   element.context.style.top = Math.round(Math.random() * y) - ((y + 1) / 2) +'px';
                   element.context.style.opacity = opacity;
               }

                /* the vibrate stop function */
                var stopVibrate = function() {
                    clearInterval(interval);
                    element.context.style.position = "static";
                    element.context.style.left = '0px';
                    element.context.style.top = '0px';
                    element.context.style.webkitTransform = 'rotate(0deg)';
                    element.context.style['MozTransform']    = 'rotate(0deg)';
                    element.context.style.msTransform     = 'rotate(0deg)';
                    element.context.style.oTransform      = 'rotate(0deg)';
                    element.context.style.transform       = 'rotate(0deg)';
                    element.context.style.opacity = 1;
                }

               /* the toggle rotation function, return positive and negative number for the rotate animation */
                var toggleRotation = function(rotation) {
                      if(rotation > 0) {
                          return Math.abs(rotation) * -1;
                      } else {
                          return Math.abs(rotation);
                      }
                 }

             /*
               the events - switch case
               get the trigger, convert to lowercase in case of a misspell
             */
              switch(angular.lowercase(trigger)) {
                  /* case: hover
                     onmouseover() - starts vibrate
                     onmouseout() - stops vibrate
                  */
                  case "hover":
                      element.context.onmouseover = function() {
                          interval = setInterval(vibrate, speed);
                      }

                      element.context.onmouseout = function() {
                          stopVibrate();
                      }
                  break;
                  /* case: mousedown
                   onmousedown() - starts vibrate
                   onmouseup() - stops vibrate
                   */
                  case "mousedown":
                      element.context.onmousedown = function() {
                          interval = setInterval(vibrate, speed);
                      }

                      element.context.onmouseup = function() {
                          stopVibrate();
                      }
                      break;
                  /* case: mousedown
                   onclick() - if clicked == true: stop vibration and clicked = false,
                   if clicked == false: start vibration and clicked == true
                   */
                  case "click":
                      element.context.onclick = function() {
                          if(clicked) {
                              clicked = false;
                              stopVibrate();
                          } else {
                              clicked = true;
                              interval = setInterval(vibrate, speed);
                          }
                      }
                 break;
                  /* case: pulse
                   pulse() - recursive setTimeout function to simulate pulse
                   */
                  case "pulse":
                      var pulse = function() {
                          interval = setInterval(vibrate, speed);
                          setTimeout(function() {
                              stopVibrate();
                              setTimeout(function() {
                                  pulse();
                                },1000)
                          }, 1000);
                      }
                      pulse();
                  break;
                  /* case: constant
                     start vibration only
                   */
                  case "constant":
                      interval = setInterval(vibrate, speed);
                  break;
              }
            }
        }

    });

})();
