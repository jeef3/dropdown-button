(function() {
    var __hasClass = function (element, className) {
            return element.classList ?
                element.classList.contains(className) :
                element.className.indexOf(className) !== -1;
        },
        __addClass = function (element, className) {
            element.classList ?
                element.classList.add(className) :
                element.className = [element.className, " ", className].join("");
        },
        __removeClass = function (element, className) {
            element.classList ?
                element.classList.remove(className) :
                element.className = element.className.replace(className, "");

        },
        __toggleClass = function (element, className) {

            __hasClass(element, className) ?
                __removeClass(element, className) :
                __addClass(element, className);
        },
        __slice = Array.slice;


    function DropdownButton(element, settings) {

        settings = settings || {};
        this.settings = {
            className: settings.className || "options-visible"
        };

        this.button = element;
        this.options = element.nextElementSibling;
        
        this.button.addEventListener("click", this.__proxy(this.e_buttonClicked));
        this.options.addEventListener("click", this.__proxy(this.e_optionClicked));
        document.addEventListener("click", this.__proxy(this.e_documentClicked));

        this.__proxy = function (func) {
            var _this = this;
            return function () {
                var params = __slice(arguments);
                func.call(_this, params);
            }
        }
    }

    DropdownButton.prototype.show = function() {
        __addClass(this.button, this.settings.className);
    };
        
    DropdownButton.prototype.hide = function() {
        __removeClass(this.button, this.settings.className);
    };

    DropdownButton.prototype.e_buttonClicked = function(e) {
        __toggleClass(this.button, this.settings.className);
    };
        
    DropdownButton.prototype.e_optionClicked = function(e) {
        var item,
            value,
            evt;

        if (!e.target || e.target.nodeName.toLowerCase() !== "li") return;
        item = e.target;

        value = item.getAttribute("data-value") ||
            item.id ||
            item.innerText.replace(/ /g, "-");

        evt = new CustomEvent("click.option", value);
        this.button.dispatchEvent(evt);

        this.hide();
    };

    DropdownButton.prototype.e_documentClicked = function(e) {
        if (!__hasClass(this.button, "options-visible") ||
                e.target === this.button) return;
                // TODO: Make sure it's not an option item
                //$.contains($options[0], e.target)) return;

        this.hide();
    };


    // jQuery Plugin
    if (jQuery) {
        $.fn.dropdownbutton = function(options) {
            return this.each(function() {
                if (!$(this).data('dropdown-button')) {
                    var plugin = new DropdownButton(this, options);
                    $(this).data('dropdown-button', plugin);
                }
            });
        };
    }
    
    // Export
    window.DropdownButton = DropdownButton;
})();