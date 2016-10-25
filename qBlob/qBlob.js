// JavaScript
define(["./vendor/html2canvas.js", "./vendor/Blob.js", "./vendor/canvas-toBlob.js", "./vendor/FileSaver.js"], function(html2canvas,Blob,canvasToBlob,FileSaver) {
  
  var qBlob = {};
  qBlob.saveToFile = function(obj, filename) {
  //// there are 2 options here:
  // 1st: html2canvas, which saves a lower resolutions, but works with all types of graphs
	/*html2canvas(document.getElementById(obj), {
	  onrendered: function(canvas) {
		canvas.toBlob(function(blob) {
		  saveAs(blob, filename);
		});
	  }
	});*/
  // 2nd: domtoimage which saves a higher res picture but doesn't work with all the graphs
    domtoimage.toBlob(document.getElementById(obj))
                    .then(function(blob) {
                        window.saveAs(blob, 'my-node.png');
                    });
  };
  
  return qBlob;
});