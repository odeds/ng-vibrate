/**
 * ng-vibrate
 * version: 0.0.2
 * License: MIT
 */
(function(angular) {

    var ngVibrateDirective = function ngVibrateDirective()   {
        return {
            restrict: 'AC',
            scope: {},
            link: linkFunc
        };
    };

   function linkFunc(scope, element, attrs) {

        /* the expression we get from attribute and converts to object  */
        var object = scope.$eval(attrs.vbVibrate || '{}');
        var domElement = element[0];
        var eventsArr = [];

        /* the vibrate properties (default properties)  */
        var y = angular.isUndefined(object.y) ? 2 : object.y ;
        var x = angular.isUndefined(object.x) ? 2 : object.x;
        var rotation = angular.isUndefined(object.rotation) ? 0 : object.rotation;
        var speed = angular.isUndefined(object.speed) ? 10 : object.speed;
        var opacity = angular.isUndefined(object.opacity) ? 1 : object.opacity;
        var trigger = angular.isUndefined(object.trigger) ? 'hover' : object.trigger;
        var duration = angular.isUndefined(object.duration) ? 1000 : object.duration;
        var interval;
        var clicked;

        /* the vibrate start function */
        var vibrate = function() {
            rotation = toggleRotation(rotation);
            domElement.style.position = 'relative';
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
            domElement.style.position = 'static';
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
        var toggleRotation = function toggleRotation(rotation) {
            if(rotation > 0) {
                return Math.abs(rotation) * -1;
            } else {
                return Math.abs(rotation);
            }
        };

        var addEvents = function addEvent(event, fn) {
            eventsArr.push({ event : event, fn : fn});
            domElement.addEventListener(event, fn, false);
        };

        var removeEvents = function removeEvents(event, fn) {
            domElement.removeEventListener(event, fn, false);
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
            case 'hover':
                addEvents('mouseover', function() {
                    interval = setInterval(vibrate, speed);
                });

                addEvents('mouseout', function() {
                    stopVibrate();
                });
                break;
            /* case: mousedown
             onmousedown() - starts vibrate
             onmouseup() - stops vibrate
             */
            case 'mousedown':
                addEvents('mousedown', function() {
                    interval = setInterval(vibrate, speed);
                });

                addEvents('mouseup', function() {
                    stopVibrate();
                });
                break;
            /* case: click
             onclick() - if clicked == true: stop vibration and clicked = false,
             if clicked == false: start vibration and clicked == true
             */
            case 'click':
                addEvents('click', function() {
                    if(clicked) {
                        clicked = false;
                        stopVibrate();
                    } else {
                        clicked = true;
                        interval = setInterval(vibrate, speed);
                    }
                });
                break;
            /* case: pulse
             pulse() - recursive setTimeout function to simulate pulse
             */
            case 'pulse':
                var pulse = function() {
                    interval = setInterval(vibrate, speed);
                    setTimeout(function() {
                        stopVibrate();
                        setTimeout(function() {
                            pulse();
                        },duration)
                    }, duration);
                };
                pulse();
                break;
            /* case: constant
             start vibration only
             */
            case 'constant':
                interval = setInterval(vibrate, speed);
                break;
        }

       scope.$on('$destroy', function() {
           clearInterval(interval);
           angular.forEach(eventsArr, function(value) {
               removeEvents(value.event, value.fn);
           });
       });
    }

    angular.module('ngVibrate', []).directive('vbVibrate', ngVibrateDirective);

})(angular);
