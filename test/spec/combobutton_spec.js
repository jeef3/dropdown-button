describe("Combo Button", function() {
    var button,
        options,
        combobutton;
    
    beforeEach(function() {
        loadFixtures("fixture.html");
        button = $("#button");
        options = button.next();
        combobutton = new ComboButton(button[0]);
    });

    describe("Show/Hide", function() {
        it("should show the options on 'show'", function() {
            combobutton.show();
            expect(button.hasClass("options-visible")).toBeTruthy();
        });

        it("should hide the options on 'hide'", function() {
            combobutton.hide();
            expect(button.hasClass("options-visible")).toBeFalsy();
        });

        it("should show the options when the user clicks the button", function() {
            button.click();
            expect(button.hasClass("options-visible")).toBeTruthy();
        });

        it("should hide when the user clicks an option", function() {
            button.click();
            options.children().first().click();
            expect(button.hasClass("options-visible")).toBeFalsy();
        });

        it("should hide when the user clicks the button again", function() {
            button.click().click();
            expect(button.hasClass("options-visible")).toBeFalsy();
        });

        it("should hide when the user clicks outside the button or options", function() {
            button.click();
            $("body").click();
            expect(button.hasClass("options-visible")).toBeFalsy();
        });
    });
    
    describe("Values", function() {
        var handler;
        
        beforeEach(function() {
            handler = { 
                e: null,
                getE: function () { return handler.e; },
                func: function (e, value) { handler.e = e; } 
            };
            spyOn(handler, "func").andCallThrough();
        });
        
        it("should trigger a 'click.combo' event when an option is selected", function() {
            button.on("click.combo", handler.func);
            options.children().first().click();
            expect(handler.func).toHaveBeenCalled();
        });
        
        it("should accept '0' as a value", function() {
            button.on("click.combo", handler.func);
            options.find("[data-combo-button-value='0']").click();
            expect(handler.func).toHaveBeenCalledWith(handler.getE(), 0);
        });
    });

    describe("jQuery Plugin", function() {

        it("should have a jQuery plugin", function() {
            expect(button.combobutton).toBeDefined();
        });

        it("should store a reference to itself on the button data", function() {
            var ref = button.combobutton().data("combobutton");
            expect(ref instanceof ComboButton).toBeTruthy();
        });
    });
});