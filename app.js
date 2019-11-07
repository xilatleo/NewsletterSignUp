const express = require('express');
const bodyparser = require('body-parser');
const request = require ('request');

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req,res){
    var fistName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(fistName);
    console.log(lastName);
    console.log(email);
    
    
})
app.listen(3000, function(){
    console.log('app is listening to port 3000');
    
});