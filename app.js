var express = require('express');
var bodyParser = require('body-parser');
var stream = require('stream');
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

var app = express();

app.use(bodyParser.json({limit: '100mb'}));

app.post('/', function(request, response){
  pdfMake.createPdf(request.body).getBuffer(buffer => {
    var bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(response);
  })
});

app.listen(7007);
