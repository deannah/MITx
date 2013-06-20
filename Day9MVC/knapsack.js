var knapsack = (function() {
    
    exports = {};
    
    function Model() {
        // want to create an array of the items.
		var items = [];
		
		$("img").each(function(index, domEle) {
			var array = [];
			array["weight"] = $(domEle).data("weight");
			array["value"] = $(domEle).data("value");
			items[$(domEle).data("name")] = array;
		})
		console.log(items);
		
    }
    
    function View(div, model, controller) {
        
    }
    
    function Controller(model) {
        
    }
    
    function setup(div) {
        var model = Model();
		var controller = Controller(model);
		var view = View(div, model, controller)
    }
    
    exports.setup = setup;
    return exports;
})();

$(document).ready(function() {
    $(".myknapsack").each(function() {
        knapsack.setup($(this));
    });
});