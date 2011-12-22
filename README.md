Combo Button
============

Just another combo button widget. Includes jQuery plugin.

Usage
-----

##### HTML

    <button id="my-button">My Button</button>
    <ul>
      <li data-combo-button-action="option-1">Option 1</li>
      <li data-combo-button-action="option-2">Option 2</li>
    </ul>
    
##### jQuery

    $("#my-button").combobutton();

Click events are triggered on the button element and are namespacned to "combo", e.g.: button.combo. The action is passed as a parameter to the event handler.

  - The data-combo-button-action attribute,
  - The item id, or,
  - The item text, with spaces replaced with hypens.

##### Events

    $("#my-button").on("click.combo", function (e, action) { /* do stuff */ });