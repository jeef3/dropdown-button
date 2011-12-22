describe("Combo Button", function() {
    var button,
        options,
        combobutton;
    
    beforeEach(function() {
        loadFixtures("fixture.html");
        button = $("#button");
        options = button.next();
    });

    describe("Show/Hide", function() {

        beforeEach(function() {
            combobutton = new ComboButton(button[0]);
        });

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
            options.first().click();
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