// JavaScript
define(["./vendor/html2canvas.js", "./vendor/Blob.js", "./vendor/canvas-toBlob.js", "./vendor/FileSaver.js"], function() {
  
  var qBlobPDF = {};
  qBlobPDF.saveToFile = function(obj, filename) {
	html2canvas(document.getElementById(obj), {
	  onrendered: function(canvas) {
		var imgData = canvas.toDataURL('image/png');    
        var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save(filename);  
	  }
	});
  };
  
  return qBlobPDF;
});