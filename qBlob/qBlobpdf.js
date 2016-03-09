// JavaScript
define(["./vendor/html2canvas.js", "./vendor/Blob.js", "./vendor/canvas-toBlob.js", "./vendor/FileSaver.js"], function(html2canvas,Blob,canvasToBlob,FileSaver) {
  
  var qBlobPDF = {};
  qBlobPDF.saveToFile = function(obj, filename) {
	html2canvas(document.getElementById(obj), {
	  onrendered: function(canvas) {
		var ctx=canvas.getContext("2d");
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        var imgData = canvas.toDataURL("image/jpg");  
        var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save(filename);  
	  }
	});
  };
  
  return qBlobPDF;
});