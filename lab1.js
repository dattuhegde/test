var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1/student', function(err, db)
{ 
if(!err)
  {
  var server =  app.listen(3005, function()
  {
  var port = server.address().port;
  console.log("welcome");
  console.log('student app listening on port 3005! go to http://localhost:%s',port);
  
});
app.get('/',function(req,res)
{ 
  res.send("We are Connected");

});

app.get('/lab1.html', function(req, res)
        { res.sendFile(__dirname + '/'+'lab1.html');
});

app.get('/stud_get', function(req, res)
{
var dbo = db.db("student");
  dbo.createCollection("customers", function(err,res){
    if (err) throw err;
    console.log("Collection created!");
});
             
var myobj= {USN :req.query.usn,Name:req.query.namee,sex:req.query.sex,Semester:req.query.sem,college:req.query.college,adhar:req.query.aadhar,pass:req.query.pass_no,account:req.query.bank_no};
dbo.collection("details").insertOne(myobj,function(err,res){
if(err)throw err;
console.log("1 docu inserted");
})
  res.send('<p>USN : '+req.query.usn+'</p><p>Name : '+req.query.name+'</p><p>Sex : '+req.query.sex+'</p><p>Semester : '+req.query.semester+'</p><p>College : '+req.query.college+'</p><p>Addhar No. : '+req.query.aadhar+'</p><p>passport No. : '+req.query.pass_no+'</p><p> Bank Account No : '+req.query.bank_acc+'</p>');
});
}
else
{
db.close
}
});