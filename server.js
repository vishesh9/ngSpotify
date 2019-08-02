//this is assuming a nodejs server environment
var postQuery = 'grant_type=client_credentials ';
import request from 'request';
import express from 'express';
var app = express();
app.get('/getToken', function(req, res){
  request({
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      'Authorization': 'Basic YourBase64EncodedCredentials',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postQuery.length
    },
    body: postQuery
  }, function (error, response, data){
    //send the access token back to client
    res.end(data);
  });    
});