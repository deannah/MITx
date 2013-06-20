var knapsack = (function() {
    
    exports = {};
    
	var itemHTML = [
			'<img src="clock.png" data-value="175" data-weight="10" data-name="clock">',
			'<img src="painting.png" data-value="90" data-weight="9" data-name="painting">',
			'<img src="radio.png" data-value="20" data-weight="4" data-name="radio">',
			'<img src="vase.png" data-value="50" data-weight="2" data-name="vase">',
			'<img src="book.png" data-value="10" data-weight="1" data-name="book">',
			'<img src="computer.png" data-value="200" data-weight="20" data-name="computer">'];
	
    function Model() {
        // want to create an array of the items.
		var items = [];
		
		$("img").each(function(index, domEle) {
			var array = [];
			array["weight"] = $(domEle).data("weight");
			array["value"] = $(domEle).data("value");
			array["name"] = $(domEle).data("name");
			array["html"] = $(domEle).html();
			items[index] = array;
		})
		console.log(items);
		console.log(items.length);
		return {items: items}
		
    }
    
    function View(div, model, controller) {
		var houseDiv = $("<div class='house location'></div>");
		var sackDiv = $("<div class='sack location'></div>");
        var items = model.items;
		var itemSpans = [];
		$(".item").remove();
		for (var i = 0; i<items.length; i++) {
			var itemSpan = $("<span class='item "+i+"'></span>")
			var itemhtml = itemHTML[i];
//			itemSpan.text(items[i].name + " Value: $" + items[i].value + " Weight: " + items[i].weight + " kg");
			itemSpan.append(itemhtml);
			var text= $("<p>Value: $" + items[i].value + " Weight: " + items[i].weight + " kg</p>");
			itemSpan.append(text);
			houseDiv.append(itemSpan);
			itemSpans[i]=itemSpan;
		}
		
		div.append(houseDiv, sackDiv);

		$(".item").click(function() {
			var id; // items[id] will refer to the clicked item.
			
			for(var i = 0; i<items.length; i++) {
				if ($(this).hasClass(i)) {id=i;}
			}
			n = items[id].name;
			console.log("You clicked " + n + "!");
			
			var par = $(this).parent();
			this.remove();
			
			if (par.hasClass("house")) {
				sackDiv.append(itemSpans[id]);
			}
			else {
				houseDiv.append(itemSpans[id]);
			}
			
			
		});
    }
    
    function Controller(model) {
        
    }
    
    function setup(div) {
		
		for(var i = 0; i < itemHTML.length; i++) {
			var itemSpan = $("<span class='item'></span>");
			itemSpan.append(itemHTML[i]);
			div.append(itemSpan);
			console.log(itemHTML[i]);
		}
		
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