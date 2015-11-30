/**
 * ng-vibrate
 * version: 0.0.2
 * License: MIT
 */
(function(angular) {

    angular.module("ngVibrate", []).directive("vbVibrate", function() {
        return {
            restrict: "AC",
            link: function(scope, element, attrs) {

                /* the string we get from attribute and converts to object  */
                var object = scope.$eval(attrs.vbVibrate || "{}");
                var domElement = element[0];

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
                   domElement.style.position = "relative";
                   domElement.style.webkitTransform = 'rotate('+rotation+'deg)';
                   domElement.style['MozTransform']    = 'rotate('+rotation+'deg)';
                   domElement.style.msTransform     = 'rotate('+rotation+'deg)';
                   domElement.style.oTransform      = 'rotate('+rotation+'deg)';
                   domElement.style.transform       = 'rotate('+rotation+'deg)';
                   domElement.style.left = Math.round(Math.random() * x) - ((x + 1) / 2) +'px';
                   domElement.style.top = Math.round(Math.random() * y) - ((y + 1) / 2) +'px';
                   domElement.style.opacity = opacity;
               };

                /* the vibrate stop function */
                var stopVibrate = function() {
                    clearInterval(interval);
                    domElement.style.position = "static";
                    domElement.style.left = '0px';
                    domElement.style.top = '0px';
                    domElement.style.webkitTransform = 'rotate(0deg)';
                    domElement.style['MozTransform']    = 'rotate(0deg)';
                    domElement.style.msTransform     = 'rotate(0deg)';
                    domElement.style.oTransform      = 'rotate(0deg)';
                    domElement.style.transform       = 'rotate(0deg)';
                    domElement.style.opacity = 1;
                };

               /* the toggle rotation function, return positive and negative number for the rotate animation */
                var toggleRotation = function(rotation) {
                      if(rotation > 0) {
                          return Math.abs(rotation) * -1;
                      } else {
                          return Math.abs(rotation);
                      }
                 };

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
                      domElement.onmouseover = function() {
                          interval = setInterval(vibrate, speed);
                      };

                      domElement.onmouseout = function() {
                          stopVibrate();
                      };
                  break;
                  /* case: mousedown
                   onmousedown() - starts vibrate
                   onmouseup() - stops vibrate
                   */
                  case "mousedown":
                      domElement.onmousedown = function() {
                          interval = setInterval(vibrate, speed);
                      };

                      domElement.onmouseup = function() {
                          stopVibrate();
                      };
                      break;
                  /* case: mousedown
                   onclick() - if clicked == true: stop vibration and clicked = false,
                   if clicked == false: start vibration and clicked == true
                   */
                  case "click":
                      domElement.onclick = function() {
                          if(clicked) {
                              clicked = false;
                              stopVibrate();
                          } else {
                              clicked = true;
                              interval = setInterval(vibrate, speed);
                          }
                      };
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
                      };
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

})(angular);
