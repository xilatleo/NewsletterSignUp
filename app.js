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

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fistName,
                    LNAME: lastName
                }
            }
        ]
    };
     var jsonData = JSON.stringify(data);

    var options = {
        url:'https://us5.api.mailchimp.com/3.0/lists/3cb5d4d8f5',
        method: 'POST',
        headers: {
            'Authorization' : 'quan1 ed673bb5509e7a34f63853d574f9b2aa-us5',        
        },
         body: jsonData
    }
    request(options, function(error, response,body){
        if(error){
           res.sendFile(__dirname + '/failure.html');
            
        }else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
            }else {
                res.sendFile(__dirname + '/failure.html');
            }
            
        }
    })

    
})

app.post('/failure',function(req,res){
    res.redirect('/');
});

app.post('/success',function(req,res){
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function(){
    console.log('app is listening to port 3000');
    
});
//ed673bb5509e7a34f63853d574f9b2aa-us5
//3cb5d4d8f5