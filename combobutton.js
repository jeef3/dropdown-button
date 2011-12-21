(function($) {
    function ComboButton(element, options) {
        var _this = this,
            $element = $(element),
            $options = $element.next();
        
        var defaults = {
            options: {}
        };
        var settings = $.extend({}, defaults, options);
        
        var construct = function() {
            $element.on("click", _clicked);
            $options.on("click", "", _optionClicked);
        };
        
        this.show = function() {
            
        };
        
        this.hide = function() {
            
        };
        
        var _selected = function() {
            
        };
        
        var _clicked = function(e) {
            
        };
        
        var _optionClicked = function(e) {
            
        };
        
        construct();
    }

    // jQuery Plugin
    $.fn.combobutton = function(options) {
        return this.each(function() {
            if (!$(this).data('combobutton')) {
                var plugin = new ComboButton(this, options);
                $(this).data('combobutton', plugin);
            }
        });
    };
    
    // Export
    window.ComboButton = ComboButton;
})(jQuery);