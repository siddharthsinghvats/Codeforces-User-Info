const express= require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.set('view engine','ejs');

app.get("/",function(req,res){


  res.sendFile(__dirname+"/main.html");



});

app.post("/",function(request,response){
    var handle=request.body.handle;
    const url="https://codeforces.com/api/user.info?handles="+handle;
    https.get(url,function(resp){
      resp.on('data',function(data){
        const cfData=JSON.parse(data);
        if(cfData.status==="OK"){
        var lName=cfData.result[0].lastName;
        var fName = cfData.result[0].firstName;
        var name = fName+" "+lName;
        var city=cfData.result[0].city;
        var country = cfData.result[0].country;
        var org=cfData.result[0].organization;
        var rank=cfData.result[0].rank;
        var maxRank=cfData.result[0].maxRank;
        var rating=cfData.result[0].rating;
        var maxr=cfData.result[0].maxRating;
        var imgSrc=cfData.result[0].titlePhoto;
        var friendOf=cfData.result[0].friendOfCount;
        response.render('user',{
          name:name,
          city:city,
          country:country,
          org:org,
          rank:rank,
          maxRank:maxRank,
          rating:rating,
          maxr:maxr,
          imgSrc:imgSrc,
          friendOf:friendOf
        });
      }
      else{
        response.sendFile(__dirname+"/fail.html");
      }
        })

    })


  });
app.listen(process.env.PORT||4000,function(){
  console.log("Server started....");
});
