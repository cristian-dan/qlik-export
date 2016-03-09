pdf = CreatePDF(canvas);
        window.location.assign('data:application/pdf;base64,' + pdf.getBase64Text());
 
 
function CreatePDF(canv) {
 
    // create BytescoutPDF object instance
    var pdf = new BytescoutPDF(canv);
 
    // set document properties: Title, subject, keywords, author name and creator name
    pdf.propertiesSet("Sample document title", "Sample subject", "keyword1, keyword 2, keyword3", "Document Author Name", "Document Creator Name");
 
    // set page size
    pdf.pageSetSize(BytescoutPDF.A4);
 
    // set page orientation (BytescoutPDF.PORTRAIT = portrait, BytescoutPDF.LANDSCAPE = landscape)
    pdf.pageSetOrientation(BytescoutPDF.PORTRAIT);
 
    // add new page
    pdf.pageAdd();
 
    // create temporary canvas (you can also simply get existing canvas)
    var canvas = canv;
 
    // load image from canvas into BytescoutPDF
    pdf.imageLoadFromCanvas(canvas);
 
    // place this image at given X, Y coordinates on the page
    pdf.imagePlace(20, 40);
 
 
    // return BytescoutPDF object instance
    return pdf;
}