// JavaScript
define(["./vendor/html2canvas.js", "./vendor/Blob.js", "./vendor/canvas-toBlob.js", "./vendor/FileSaver.js"], function(html2canvas, Blob, canvasToBlob, FileSaver) {

    var qBlobPDF = {};
    qBlobPDF.saveToFile = function(obj, filename) {
        // html2canvas(document.getElementById(obj), {
        //   onrendered: function(canvas) {
        //     var ctx=canvas.getContext("2d");
        //     ctx.webkitImageSmoothingEnabled = true;
        //     ctx.mozImageSmoothingEnabled = true;
        //     ctx.imageSmoothingEnabled = true;
        // 	canvas.toBlob(function(blob){
        //             var urlCreator = window.URL || window.webkitURL;
        //             var imageUrl = urlCreator.createObjectURL(blob);
        //             var img = new Image();

        //             img.src = imageUrl;
        //             img.onload = function(){
        //                 var pdf = new jsPDF('p','px',[img.height, img.width]);
        //                 pdf.addImage(img, 0, 0, img.width, img.height);
        //                 pdf.save('myPdf.pdf');
        //             };
        //         })
        //   }
        // });
        var node = document.getElementById(obj);
        domtoimage.toPng(node)
            .then(function(dataUrl) {
                
                var doc = new jsPDF('p', 'mm');
                doc.addImage(dataUrl, 'PNG', 10, 10);
                doc.save(filename);  
            })
    };

    return qBlobPDF;
});