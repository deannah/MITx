var knapsack = (function() {
    
    exports = {};
    
    function Model() {
        
    }
    
    function View() {
        
    }
    
    function Controller() {
        
    }
    
    function setup(div) {
        var test = $("<div class='test'></div");
        div.append(test);
    }
    
    exports.setup = setup;
    return exports;
})();

$(document).ready(function() {
    $(".myknapsack").each(function() {
        knapsack.setup($(this));
    });
});