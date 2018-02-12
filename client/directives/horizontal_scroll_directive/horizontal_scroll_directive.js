angular.module('myApp').directive('horizontalScroll', function () {
        return {
            link:function (scope, element, attrs) {
                var base = 0;
                var original =  angular.element(document.getElementById('horizontal_gallery_directive'))[0].scrollWidth;
                var innerWidth = angular.element(document.getElementById('horizontal_gallery_directive'))[0].clientWidth;          
                element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                    var scrollWidth =  angular.element(document.getElementById('horizontal_gallery_directive'))[0].scrollWidth;
                    original = scrollWidth>original?scrollWidth:original;
                    var event = window.event || event; // old IE support
                    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));        
                    scope.$apply(function(){
                        if(delta<0 && scrollWidth + base <0)
                            base =  innerWidth- original;
                        else
                            base+=500*delta;
                        if(base>0) base=0;
                        element.children().css({'transform':'translateX('+base+'px)'});
                    });
                    event.returnValue = false;
                    // for Chrome and Firefox
                    if(event.preventDefault) {
                        event.preventDefault();                        
                    }       
                });
            }
        };
    });