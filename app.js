const express = require('express');
// const request = require("request");
const https = require("https");
const app=express();
const bodyParser=require("body-parser");
const { request } = require('http');
const port=process.env.PORT || 300 ;
const server =https.createServer(app);

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,response){
    console.log("request");
    response.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const pass=req.body.pass;
    console.log(name,email,pass);
    var data={
        members:[{
            email_address: email,
            status: "subscribed",
        }]
    }
    var jsondata = JSON.stringify(data);
    const url= "https://us21.api.mailchimp.com/3.0/lists/cd918b438a";
    const options ={
        method:"POST",
        auth: "7vik:7454755386e96531799edaf3aedb1c7a-us21"
    }
    const request = https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/fail.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

server.listen(port,()=>{
    console.log("Running on port");
})

// app.listen(300,function(){
//     console.log("Server is running");
// });


//api key
// 7454755386e96531799edaf3aedb1c7a-us21

//list id 
// cd918b438a