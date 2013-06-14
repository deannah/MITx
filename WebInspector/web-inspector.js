/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function ($) {
    var exports = {};

  // The root element of the inspector.
    var root = null;
	var currentSelection;

    var template = " "
        + "<div class='tray'>"
        + "  <textarea class='text-editor'></textarea>"
        + "  <div class='property-editor'>"
        + "    <div class='node-lookup'>"
        + "      <input class='selector' /><input class='nth' />"
        + "      <button class='search'>Search</button>"
	    + "      <button class='visual'>Visual Selection</button>"
        + "    </div>"
        + "    <div class='property-list'>"
        + "    </div>"
        + "  </div>"
        + "</div>"
        + "<div class='handle'></div>";

  /*
   * Construct the UI
   */
    
    
    var toggle = function () {
        if (root.css("top") === "0px") {
            root.animate({"top" : "-300px"}, 500);
        }
        else {
            root.animate({"top" : "0px"}, 500);
        }
    };
    
	function showProperties (selected) {
		var height = selected.height();
		var width = selected.width();
		var top = selected.offset().top;
		var left = selected.offset().left;
		var margin = selected.css("margin");
		var background = selected.css("background-color");
		var foreground = selected.css("color");
		var tagName = selected.css("tagName");
		var numberChildren = selected.children().length;
		
		var propertyNames = ["Height", "Width", "Left", "Margin", "Background Color", "Foreground Color", "Tag Name", "Number of Children"];
		var propertyList = [height, width, top, left, margin, background, foreground, tagName, numberChildren];
		
		for(var i=0; i<propertyNames.length; i++) {
			var tempString = propertyNames[i] + ": " + propertyList[i];
			var tempDiv = $("<div>" + tempString + "</div>");
			$(".property-list").append(tempDiv);
		}
		
		//var heightString = ("Height: " + propertyList[0]);
		//var widthString = ("Width: " + propertyList[1]);
		//var heightLine = $("<div>" + heightString + "</div>")
		//$(".property-list").append(heightLine);
	}
	
    var searchBySelector = function () {
        var selectorBox = root.find(".selector");
        var selectorStr = selectorBox.val(); // val() gives you value of input element
        var selection = $(selectorStr).first();
		currentSelection= selection;
        var html = selection.html();
        var textEditor = root.find(".text-editor");
        textEditor.val(html);
		//textEditor.attr("data-source", selection[0]);
		showProperties(selection);
    };
	
	var enterElement = function () {
		var thisdiv = $(this);
		thisdiv.css({"border-style": "solid", "border-width": "5px", "border-color": "red"});
		thisdiv.on("click", function (evt) {
			currentSelection = thisdiv;
			console.log("Inside hover: " + currentSelection);
			console.log("Inside thisdiv: " + thisdiv[0]);
			var html = thisdiv.html();
        	var textEditor = root.find(".text-editor");
        	textEditor.val(html);
			evt.preventDefault();
			evt.stopPropagation();
			$("div").off('hover');
			$("div").css("border-style", "none");
			$("div").off("click");
			showProperties(thisdiv);
		});
	};
	
	var exitElement = function () {
		$(this).css("border-style", "none");
	};
	
	var visualSelector = function() {
		$("div").hover(enterElement, exitElement);
	};
    
	var htmlupdate = function() {
        var enteredText = $(".text-editor").val();
		var source = currentSelection; // root.find(".text-editor").attr("data-source");
		source.html(enteredText);
	}
	
  exports.initialize = function () {
    root = $("<div class='inspector'></div>").appendTo($('body'));

    root.append(template);
    root.find(".handle").on("click", toggle);
    root.find(".node-lookup .search").on("click", searchBySelector);
	root.find(".node-lookup .visual").on("click", visualSelector);
	root.find(".text-editor").keydown(htmlupdate);
  };
  
  
    
  return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function () {
    var createInspector = function () {
      window.inspector = new Inspector(jQuery);
      window.inspector.initialize();
    };

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();