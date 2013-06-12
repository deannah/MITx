// From Bootcamp Day 3

var module = (function() {
    var exports = {}; // associative array - object
    
    function bar(a,b) {
        return a+1;
    }
    
    function foo(a,b) {
        return a+b;
    }
    exports.foo = foo; // now foo will be accessible outside of this function
    
    return exports;
}());

/*
So if you go to another file:
<script src = "module.js"></script>
can now use ......module.foo(3,4).....

But they cannot use bar.

and you can have as many functions/variables in your module function as you want.
Anything you want to be usable by others, you make it an attribute of exports.
*/