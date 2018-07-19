var express=require('express');
var cors=require('cors');
var events=require('events');
var em=new events.EventEmitter();
var fs = require('fs');
var app=express()
app.use(cors());
var bodyParser=require('body-parser');
app.use(bodyParser.json());
var mongojs=require('mongojs');
var db=mongojs('YELP',['yelp','contact','user']);

var msg="Directory Name: "+ __dirname + "\n" +
         "StartTimeStamp: "+(new Date(Date.now()+"\n"))+
         "File Name: "+__filename+"\n"+
         "Process Version: "+process.version+"\n"+
         "Process Time: "+process.uptime()+"\n"+
         "Memory Use: "+JSON.stringify(process.memoryUsage())+"\n";
var write=function()
{
  try{
  fs.appendFile("D:\\yelp\\logFile.txt", msg+"- - - - - - - - - - - - - - - - - - - - - - - - - - - "+"\n"+"\n" , function(err)
  {
    if(err)
    { return console.log(err);
    }

  });
}
catch(err)
{

}
};

var logger=function()
{
  em.on('error',function(err){
   console.error(' Here Error is  ',err);
   });
   em.on('event1',write);
   em.emit ('event1');
};

app.use(express.static(__dirname));

/*  get data without any filter  */
app.get('/', function (req, res) {
    db.yelp.aggregate([
        { $match: {} }, { $project: { _id: 0 }}
        ],
            function (err, docs){
            res.json(docs);
        });
    logger();
});

/*  get more details through  */
app.get('/:id', function (req, res) {
    console.log(req.params.id);
    var uid = req.params.id;
    db.yelp.aggregate([
       { $match: { "business_id": uid }}, { $project:{ _id: 0 }}
       ],
       function (err, docs){
       res.json(docs);
     });
  logger();
});

/*  get details by filter of city */
app.get('/city/:city', function (req, res){
    console.log(req.params.city);
    var cityVal = req.params.city;
    db.yelp.aggregate([
      { $match:{ city: cityVal}},{$project:{ _id: 0 }}
      ],
      function (err, docs){
        res.json(docs);
      })
    logger();
});

/****************        Logger for inserting contact details     *****************/
app.get('/contactus/:yourName/:Email/:Subject/:Message', function (req, res) {
    console.log(req.params.yourName);
    console.log(req.params.Email);
    console.log(req.params.Subject);
    console.log(req.params.Message);
    db.contact.insert({ "yourName": req.params.yourName, "Email": req.params.Email, "Subject": req.params.Subject, "Message": req.params.Message },
        function (err, docs) { res.json(docs);
    });
    logger();
});

/****************        Logger for registering users     *****************/
app.get('/register/:username/:emailaddress/:password/:confirmpassword', function (req, res) {
    console.log(req.params.username);
    console.log(req.params.emailaddress);
    console.log(req.params.password);
    console.log(req.params.confirmpassword);
    db.user.insert({ "username": req.params.username, "emailaddress": req.params.emailaddress, "password": req.params.password, "confirmpassword": req.params.confirmpassword },
        function (err, docs) { res.json(docs);
      })
    logger();
});

/****************   Logger for login *************************/
app.get('/login/:username/:password', function (req, res) {
    console.log(req.params.username);
    console.log(req.params.password);
    db.user.find({ "username": req.params.username,"password": req.params.password},{_id:0},
        function (err, docs) { res.json(docs);
      })
    logger();
});

app.listen(3000);
console.log("Server running");
