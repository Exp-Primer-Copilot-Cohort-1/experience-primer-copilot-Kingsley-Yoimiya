// Create web server
// Start: node comments.js
// Load: http://localhost:3000/comments.html

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        fs.readFile('./comments.html', function (err, data) {
            if (err) {
                response.end(err);
            } else {
                response.end(data);
            }
        });
    } else if (pathname == '/getComments') {
        var commentsStr = JSON.stringify(comments);
        response.end(commentsStr);
    } else if (pathname == '/postComment') {
        var comment = urlObj.query;
        comment.date = new Date().toLocaleString();
        comments.unshift(comment);
        response.end(JSON.stringify(comment));
    } else {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                response.end(err);
            } else {
                response.end(data);
            }
        });
    }
});

server.listen(3000, function () {
    console.log('server is running at port 3000');
});