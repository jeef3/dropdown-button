(function($) {
    function ComboButton(element, options) {
        var _this = this,
            $element = $(element);
        
        var defaults = {
            options: {}
        };
        var settings = $.extend({}, defaults, options);
        
        this.public_method = function() {
            
        };
        
        var _private_method = function() {
            
        };
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