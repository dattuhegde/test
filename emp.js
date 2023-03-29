var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app = express();
var ejs=require('ejs');
var expressValidator = require('express-validator')
app.use(expressValidator())
var MongoClient = require('mongodb').MongoClient;
//body-parser@1.20.2, ejs@3.1.6, e-validtor@5.3.0, express@4.17.1, mongodb@2.2.33

MongoClient.connect('mongodb://127.0.0.1/4db', function(err, db){
    var dbo = db.db("4db");        
    if(!err){
        console.log('Welcome');
            var server =  app.listen(3002, function()
            {
            var port = server.address().port
            console.log('Employee app listening on port %s go to http://localhost:3002',port)
            })
            
    
    app.get('/',function(req,res){
        res.send("We are Connected");

    })
    app.get('/exp6.html', function(req, res){
        res.sendFile(__dirname+'/'+'exp6.html');
    })

    app.post('/emp_post',urlencodedParser, function(req, res){
        
        var obj = {empid:req.body.empid,
        name :req.body.name,
        dep : req.body.dep,
        des :req.body.des,
        mob :req.body.mob,
        email :req.body.email}

        dbo.createCollection("employee1", function(err, res) {
            if (err) throw err;
        });

        dbo.collection('employee1').insertOne(obj, function(err,doc){
            if(err) throw err;
                        console.log("1 docu inserted");
                        
                    });             
    
        console.log('Record Inserted');
        res.send('<p>EMP_ID : '+req.body.empid+'</p><p>Name : '+req.body.name+'</p><p>Department : '
        +req.body.dep+'</p><p>Designation : '+req.body.des+'</p><p>Mobile : '+req.body.mob+'</p><p>E-Mail : '+req.body.email+'</p>');

})


    
app.get('/display', function(req, res) {
      
    dbo.collection('employee1').find().toArray(function(err,i){
        if (!err) {
            res.render('46.ejs', {employees:i});
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    }); 
 
});

    
app.get('/update_emp.html', function(req, res){
    res.sendFile(__dirname+'/'+'update_emp.html');
})

app.get('/update',function(req,res){
    var e_name = req.query.name;
    var e_des = req.query.des;
    db.collection('employee1').update({"name":e_name},{$set:{"des":e_des}},function(err,i){
        if(!err)
            res.send("Record Updated Successfully")
        else
            return res.send(err)
    })
})

app.get('/delete_mca',function(req,res){
    
    db.collection('employee1').remove({"dep":"MCA"},function(err,i){
        if(!err)
            res.send("Record Deleted Successfully")
        else
            return res.send(err)
    })
})

    

    }
    else
        db.close

})
