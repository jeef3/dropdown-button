(function($) {
    function ComboButton(element, options) {
        var _this = this,
            $button = $(element),
            $options = $button.next();
        
        var defaults = {
            options: {}
        };
        var settings = $.extend({}, defaults, options);
        
        var construct = function() {
            $button.on("click", _buttonClicked);
            $options.on("click", "li", _optionClicked);
            $(document).on("click", _documentClicked);
        };

        // Public Methods
        this.show = function() {
            $button.addClass("options-visible");
        };
        
        this.hide = function() {
            $button.removeClass("options-visible");
        };

        // Private Methods
        var _buttonClicked = function(e) {
            $button.toggleClass("options-visible", !$button.hasClass("options-visible"));
        };
        
        var _optionClicked = function(e) {
            var item = $(this),
                data = item.data("combo-button-value"),
                value =  data || 
                    data === 0 ? data : false ||
                    item.attr("id") ||
                    item.text().replace(/ /g, "-");

            $button.trigger("click.combo", [ value ]);
            _this.hide();
        };

        var _documentClicked = function(e) {
            if (!$button.hasClass("options-visible") ||
                    e.target === element ||
                    $.contains($options[0], e.target)) return;

            _this.hide();
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