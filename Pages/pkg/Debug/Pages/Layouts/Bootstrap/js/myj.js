/*--This JavaScript method for Print command--*/

function PrintDoc() {

    var toPrint = document.getElementById('printarea');

    var popupWin = window.open('', '_blank', 'width=350,height=150,location=no,left=200px');

    popupWin.document.open();

    popupWin.document.write(`
            <html>
            <head><title>::Preview::</title>
            <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
            <link href="../Bootstrap/css/print.css" rel="stylesheet" />
            </head><body onload="window.print()">`)

    popupWin.document.write(toPrint.innerHTML);

    popupWin.document.write('</html>');

    popupWin.document.close();

}

/*--This JavaScript method for Print Preview command--*/

function PrintPreview() {

    var toPrint = document.getElementById('printarea');

    var popupWin = window.open('', '_blank', 'width=350,height=150,location=no,left=200px');

    popupWin.document.open();

    popupWin.document.write('<html><title>::Print Preview::</title><link rel="stylesheet" type="text/css" href="Print.css" media="screen"/></head><body">')

    popupWin.document.write(toPrint.innerHTML);

    popupWin.document.write('</html>');

    popupWin.document.close();

}