// Day 5, trying to make a calculator from previous work
var calculatorModule = (function () {
    var exports = {};





    $(document).ready(function () {
        $(".calculator").each(function() {
            setup_calculator(this);
        });
    });

    return exports
}());