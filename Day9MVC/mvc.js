var counter = (function() {
    
    function EventHandler() { // has on() to register a handler and trigger() to call all callbacks.
        // want an object that will map eventString to list of callbacks
        var handlers = {};
        
        function on(eventString, callback) {
            var cbList = handlers[eventString];
            
            if (cbList === undefined) {
                cbList = [];
                handlers[eventString] = cbList;
            }
            
            cbList.push(callback);
        }
        function trigger(eventString, data) {
            var cbList = handlers[eventString];
            if (cbList !== undefined) { //this means that the callback list actually exists!
                for (var i = 0; i < cbList.length; i+=1) {
                    cbList[i](data);
                }
            }
        }
        return { on: on, trigger: trigger};
    }
    
    function Model() {
        var eventHandlers = EventHandler();
        var count = 0; // current value of counter
        function addOne() {
            count+=1;
            eventHandlers.trigger("update", count);
        }
        function reset() {
            count=0;
            eventHandlers.trigger("update", count);
        }
        function getCount() {
            return count;
        }
        return {
            addOne : addOne, 
            reset : reset,
            getCount : getCount,
            on: eventHandlers.on};
    }
    
    function Controller(model) { // will need increment function to increase value of counter
        function increment() {
            model.addOne();
        }
        return {increment: increment};
    }
    
    function View(div, model, controller) { // just a view of what data is in the model. Not the whole user interface.
        
        var display = $("<div class='view'> The current value of the counter is <span>0</span>.</div>");
        var counterValue = display.find('span');
        div.append(display);
        
        
        function update() {
            var cVal = model.getCount();
            counterValue.text(cVal);
        }
        
        model.on("update", update);
        
        return {};
    }
    
    function setup(div) {
        var model = Model();
        var controller = Controller(model);
        var view = View(div, model, controller);
        var view2 = View(div, model, controller);
        
        var button = $("<button>Increment</button>");
        button.on("click", controller.increment);
        div.append(button);
    }
    
    //items accessible to outsiders
    return {setup: setup };
    
    }());
    
$(document).ready(function() {
    $(".counter").each(function() {
        counter.setup($(this));
    });
});

