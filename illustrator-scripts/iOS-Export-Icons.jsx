/**
 * Licensed under The MIT License
 * 
 * Copyright � 2012 Kungfuters LLC http://kungfuters.com

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * iOS-Export-Icons.jsx
 * 
 * @author Matt Senter http://zipl.us/matt
 * 
 * The purpose of this script is to quickly export your single icon drawing from
 * Illustrator into each of the various sizes for use throughout the Apple
 * ecosystem. As an example, you generally need to have a 57x57 and 72x72 icon
 * for iPhone and iPad respectively. On top of that you need the retina versions
 * at twice the size. Files are exported using the prescribed Apple names.
 */

/*
 * Here is our list of icons to export. These are the standard Apple icons used
 * in various places throughout the Apple ecosystem. Add/remove any extra ones
 * here.
 */
var exportIcons = [ {
	fileName : "Icon.png",
	size : 57
}, {
	fileName : "Icon@2x.png",
	size : 114
}, {
	fileName : "Icon-Small-50.png",
	size : 50
}, {
	fileName : "Icon-Small-50@2x.png",
	size : 100
}, {
	fileName : "Icon-72.png",
	size : 72
}, {
	fileName : "Icon-72@2x.png",
	size : 144
}, {
	fileName : "iTunesArtwork.png",
	size : 512
} ];
/*
 * Get a reference to the current document.
 */
var doc = app.activeDocument;
/*
 * We're gonna store our exported icons in the same directory in which our .ai
 * file is saved.
 */
var basePath = doc.path.toString() + "/";
/*
 * Set up our export options. We're gonna use PNG 24.
 */
var options = new ExportOptionsPNG24();
options.antiAliasing = true;
options.transparency = false;
options.artBoardClipping = true;
/*
 * We need the size of our artboard. NOTE: The artboard MUST be square. Sorry if
 * this is an inconvenience, but icons are square.
 */
var artboard = doc.artboards[0];
var baseSize = artboard.artboardRect[2];
/*
 * Now to do the exporting!
 */
for ( var i = 0; i < exportIcons.length; i++) {
	var toExport = exportIcons[i];
	var fileName = toExport.fileName;
	/*
	 * Export sizing is always done as a percentage, so we have to convert from
	 * our desired pixel size to a percentage of our artboard size.
	 */
	var targetSize = toExport.size;
	var scale = targetSize * 100.0 / baseSize;
	options.horizontalScale = scale;
	options.verticalScale = scale;
	/*
	 * Write it out to the current working directory.
	 */
	var file = new File(basePath + fileName);
	doc.exportFile(file, ExportType.PNG24, options);
}