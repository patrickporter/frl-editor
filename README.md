# frl-editor
An editor written in HTML and JS for creating and modifying batch find/replace lists in a specific XML format for the MT Enhanced CAT plugin

This is an HTML page that runs completely locally in the browser and uses JavaScript. It transforms the XML of the find/replace lists used in my ME Enhanced CAT plugin.  To use it, click the editor.html file and use the menu to create a new file or open an existing one. It has to be in the same folder as the JavaScript files.  The XSL file is for reference only and the transform markup is coded as a JavaScript string in the xsl.js file.  That's what allows it to run completely locally without having to select the xsl file as an upload every time. 

The page is tested and works in Chrome. It definitely does not work in Internet Explorer, although it could probably be made to work.  No idea whether it works in FF.
