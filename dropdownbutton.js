(function($) {
    function DropdownButton(element, options) {
        var _this = this,
            $button = $(element),
            $options = $button.next();
        
        var defaults = {
                options: {},
                optionsVisibleClassName: "options-visible"
            },
            settings = $.extend({}, defaults, options);
        
        var construct = function() {
            $button.on("click", _buttonClicked);
            $options.on("click", "li", _optionClicked);
            $(document).on("click", _documentClicked);
        };

        // Public Methods
        this.show = function() {
            $button.addClass(settings.optionsVisibleClassName);
        };
        
        this.hide = function() {
            $button.removeClass(settings.optionsVisibleClassName);
        };

        // Private Methods
        var _buttonClicked = function(e) {
            $button.toggleClass(settings.optionsVisibleClassName, !$button.hasClass(settings.optionsVisibleClassName));
        };
        
        var _optionClicked = function(e) {
            var item = $(this),
                data = item.data("value"),
                value =  data || 
                    (data === 0 ? data : false) ||
                    item.attr("id") ||
                    item.text().replace(/ /g, "-");

            $button.trigger("click.option", [ value ]);
            _this.hide();
        };

        var _documentClicked = function(e) {
            if (!$button.hasClass(settings.optionsVisibleClassName) ||
                    e.target === element ||
                    $.contains($options[0], e.target)) return;

            _this.hide();
        };
        
        construct();
    }

    // jQuery Plugin
    $.fn.dropdownbutton = function(options) {
        return this.each(function() {
            if (!$(this).data('dropdown-button')) {
                var plugin = new DropdownButton(this, options);
                $(this).data('dropdown-button', plugin);
            }
        });
    };
    
    // Export
    window.DropdownButton = DropdownButton;
})(jQuery);