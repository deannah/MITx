var knapsack = (function() {
    
    var exports = {};
    
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
			array.weight = $(domEle).data("weight");
			array.value = $(domEle).data("value");
			array.name = $(domEle).data("name");
			array.html = $(domEle).html();
			array.location = "house";
			items[index] = array;
		});
		
		function trackProgress() {
			var totValue = 0;
			var totWeight = 0;
			for (var i = 0; i<items.length; i++) {
				if(items[i].location == "sack") {
					totValue += items[i].value;
					totWeight += items[i].weight;
				}
			}
			return{totValue: totValue, totWeight: totWeight} // model.trackProgress(). to access these
		}
		return{items: items, trackProgress: trackProgress};	// model. to access these.
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
			itemSpan.append(itemhtml);
			var text= $("<p>Value: $" + items[i].value + " Weight: " + items[i].weight + " kg</p>");
			itemSpan.append(text);
			houseDiv.append(itemSpan);
			itemSpans[i]=itemSpan;
		}
		
		div.append(houseDiv, sackDiv);
		
		var info = $("<div class='info'></div>");
		div.append(info);
		
		model.trackProgress();
		function updateInfo() {
			info.text("Total value: $" + model.trackProgress().totValue + "  Total weight: " + model.trackProgress().totWeight + " kg");
		}
		updateInfo();
		
		$(".item").click(function() {
			var id; // items[id] will refer to the clicked item.
			
			for(var i = 0; i<items.length; i++) {
				if ($(this).hasClass(i)) {id=i;}
			}
			n = items[id].name;
			
			var par = $(this).parent();
			
			$(".nope").remove(); //in case there had been a warning.
			
			if (par.hasClass("house")) {
				if(model.trackProgress().totWeight+items[id].weight <= 20) {
					this.remove();
					sackDiv.append(itemSpans[id]);
					model.items[id].location="sack";
					model.trackProgress();
					updateInfo();
				}
				else {
					div.append("<div class='nope'>Weight limit is 20 kg.</div>")
				}
			}
			else {
				this.remove();
				houseDiv.append(itemSpans[id]);
				model.items[id].location="house";
				model.trackProgress();
				updateInfo();
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
		}
		
		var model = Model();
		var controller = Controller(model);
		var view = View(div, model, controller)
		
		var testSVG = d3.select("body").append("svg").attr("width", 400).attr("height", 400);
		
		testSVG.append("svg:circle")
    		.attr("id", "blueCircle")
    		.attr("cx", 50)
    		.attr("cy", 140)
    		.attr("r", 40)
    		.attr("fill", "blue")
    		.call(d3.behavior.drag().on("drag", move));
		
		testSVG.selectAll("text").data(model.items).enter().append("text")
				.attr("x", 0)
				.attr("y", function(d, i) {return i*20;})
				.text(function(d, i) {return model.items[i].name;})
				.call(d3.behavior.drag().on("drag", moveText));
		
		function moveText() {
			var dragTarget = d3.select(this);
			dragTarget.attr("x", function() {return d3.event.x;})
					.attr("y", function() {return d3.event.y;});
		}
		
		function move(){
    		//this.parentNode.appendChild(this);
    		var dragTarget = d3.select(this);
    		dragTarget
				.attr("cx", function(){return d3.event.dx + parseInt(dragTarget.attr("cx"))})
        		.attr("cy", function(){return d3.event.dy + parseInt(dragTarget.attr("cy"))});
};
		
    }
    
    exports.setup = setup;
    return exports;
})();

$(document).ready(function() {
    $(".myknapsack").each(function() {
        knapsack.setup($(this));
    });
});