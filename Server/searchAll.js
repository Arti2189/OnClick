/* TODO  to use this middleware web framework API
         we need to import following npm packages
         1. express
         2. cors
         3. body-parser
         4. mongojs
         and here database is YELP
         and following collection is used
         1. yelp
         2. contact
         3. user
         4. review
         */
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
var events=require('events');
var em=new events.EventEmitter();
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('YELP', ['yelp', 'contact','user','review']);
app.use(express.static(__dirname));


var msg="Directory Name: "+ __dirname + "\n" +
         "StartTimeStamp: "+(new Date(Date.now()+"\n"))+
         "File Name: "+__filename+"\n"+
         "Process Version: "+process.version+"\n"+
         "Process Time: "+process.uptime()+"\n"+
         "Memory Use: "+JSON.stringify(process.memoryUsage())+"\n";
var write=function()
{
  try{
  fs.appendFile("D:\\logFile.txt","server running on port 3001"+'\n'+ msg+"- - - - - - - - - - - - - - - - - - - - - - - - - - - "+"\n"+"\n" , function(err)
  {
  });
}
catch(err)
{

}
};

var logger=function()
{
  em.on('error',function(err){
   });
   em.on('event1',write);
   em.emit ('event1');
};


//service call for list users
app.get('/', function (req, res) {
    db.yelp.aggregate([{ $match:{}},{$project:{ _id: 0 }}],function (err, docs)
    {
      res.json(docs);
    })
    logger();
});

//call service when particular id is given
app.get('/:id', function (req, res) {
    var uid = req.params.id;
    db.yelp.aggregate([{ $match: { "business_id": uid } },{ $project: { _id: 0 } }], function (err, docs) { res.json(docs); })
    logger();
});

/****************        API for inserting contact details     *****************/
app.get('/contactus/:yourName/:Email/:Subject/:Message', function (req, res) {
    db.contact.insert({ "yourName": req.params.yourName, "Email": req.params.Email, "Subject": req.params.Subject, "Message": req.params.Message },
        function(err, docs){ res.json(docs); })
        logger();
});

/****************        API for registering users     *****************/
app.get('/register/:username/:emailaddress/:password', function (req, res) {
    db.user.insert({ "username": req.params.username, "emailaddress": req.params.emailaddress, "password": req.params.password },
        function (err, docs) { res.json(docs); })
        logger();
});
/****************        API for inserting reviews     *****************/
app.get('/review/:yourName/:Email/:Category/:Message', function (req, res) {
    db.review.insert({ "yourName": req.params.yourName, "Email": req.params.Email, "Category": req.params.Category, "Message": req.params.Message },
        function (err, docs){res.json(docs); })
        logger();
});

/*****************     API for fetching Reviews *****************/
app.get('/getreviews/pages', function (req, res) {
    db.review.aggregate([{ $match: {} }, { $project: { _id: 0 } }], function (err, docs) { res.json(docs); })
    logger();
});

/****************   API for login *************************/
app.get('/login/:username/:password', function (req, res) {
    db.user.find({ "username": req.params.username,"password": req.params.password},{_id:0},
        function (err, docs) { res.json(docs); })
        logger();
});


/******************  API when category is given *******************/

app.get('/categories/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when city is given *******************/
app.get('/city/:city', function (req, res) {
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match:{city: cityVal }},{$project:{ _id: 0 }}],
        function (err, docs){ res.json(docs); })
        logger();
});

/******************  API when city and categories is given *******************/
app.get('/city_categories/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword is given *******************/
app.get('/keyword/:keyword', function (req, res) {
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword and categories is given *******************/

app.get('/keyword_categories/:keyword/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([{ $match: { $and: [{ "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] }] } },
    { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword and city is given *******************/

app.get('/keyword_city/:keyword/:city', function (req, res) {
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([{
        $match: { $and: [{ city: cityVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] }
    },
    { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city and categories is given *******************/

app.get('/keyword_city_categories/:keyword/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword and state  is given *******************/
app.get('/keyword_state/:keyword/:state', function (req, res) {
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,state  and categories is given *******************/

app.get('/keyword_state_categories/:keyword/:state/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }], function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city and state is given *******************/

app.get('/keyword_state_city/:keyword/:state/:city', function (req, res) {
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city,state and categories is given *******************/

app.get('/keyword_state_city_categories/:keyword/:state/:city/:categories', function (req, res) {
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state,city and categories is given *******************/

app.get('/state_city_categories/:state/:city/:categories', function (req, res) {
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state is given *******************/

app.get('/state/:state', function (req, res) {
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { state: stateVal } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state and categories is given *******************/

app.get('/state_categories/:state/:categories', function (req, res) {
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state and city is given *******************/

app.get("/state_city/:state/:city", function (req, res) {
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { $and: [{ "state": stateVal }, { "city": cityVal }] } },
    { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword and state is given *******************/

app.get('/keyword_state/:keyword/:state', function (req, res) {
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ state: stateVal }, { categories: categoriesVal }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
        logger();
});


//sort by high to low

/******************  API when  categories is given *******************/

app.get('/categories_high_to_low/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') } },
        { $project:{ _id: 0 } },
        { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when city is given *******************/

app.get('/city_high_to_low/:city', function (req, res) {
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { city: cityVal } }, { $project:{ _id: 0 } },
    { $sort: { stars: -1 } }], function (err, docs) { res.json(docs); })
    logger();
});

/******************  API when city and categories is given *******************/

app.get('/city_categories_high_to_low/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 }}],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword is given *******************/

app.get('/keyword_high_to_low/:keyword', function (req, res) {
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword and categories is given *******************/

app.get('/keyword_categories_high_to_low/:keyword/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([{ $match: { $and: [{ "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] }] } },
    { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city  is given *******************/

app.get('/keyword_city_high_to_low/:keyword/:city', function (req, res) {
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([{
        $match: { $and: [{ city: cityVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] }
    },
    { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city and categories is given *******************/

app.get('/keyword_city_categories_high_to_low/:keyword/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword is given *******************/

app.get('/keyword_state_high_to_low/:keyword/:state', function (req, res) {
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,state and categories is given *******************/

app.get('/keyword_state_categories_high_to_low/:keyword/:state/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }], function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword and state is given *******************/

app.get('/keyword_state_city_high_to_low/:keyword/:state/:city', function (req, res) {
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }] } },
        { $project:{ _id: 0 } }, { $sort:{ stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,state,city and categories is given *******************/

app.get('/keyword_state_city_categories_high_to_low/:keyword/:state/:city/:categories', function (req, res) {
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state is given *******************/

app.get('/state_high_to_low/:state', function (req, res) {
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { state: stateVal } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state and categories is given *******************/

app.get('/state_categories_high_to_low/:state/:categories', function (req, res) {
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state and city is given *******************/

app.get("/state_city_high_to_low/:state/:city", function (req, res) {
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { $and: [{ "state": stateVal }, { "city": cityVal }] } },
    { $project:{ _id: 0 } }, { $sort: { stars: -1 } }], function (err, docs) { res.json(docs); })
    logger();
});

/******************  API when state,city and categories is given *******************/

app.get('/state_city_categories_high_to_low/:state/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

//sort low to high

/******************  API when  categories is given *******************/

app.get('/categories_low_to_high/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') } },
        { $project: { _id: 0 } },
        { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when city is given *******************/

app.get('/city_low_to_high/:city', function (req, res) {
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { city: cityVal } }, { $project: { _id: 0 } },
    { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when city and categories is given *******************/

app.get('/city_categories_low_to_high/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword is given *******************/

app.get('/keyword_low_to_high/:keyword', function (req, res) {
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword  and categories is given *******************/

app.get('/keyword_categories_low_to_high/:keyword/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([{ $match: { $and: [{ "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] }] } },
    { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city is given *******************/

app.get('/keyword_city_low_to_high/:keyword/:city', function (req, res) {
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([{
        $match: { $and: [{ city: cityVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] }
    },
    { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city and categories is given *******************/

app.get('/keyword_city_categories_low_to_high/:keyword/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 }}, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword state is given *******************/

app.get('/keyword_state_low_to_high/:keyword/:state', function (req, res) {
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] } },
        { $project:{ _id: 0 }}, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,state and categories is given *******************/

app.get('/keyword_state_categories_low_to_high/:keyword/:state/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }], function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when keyword,city and state is given *******************/

app.get('/keyword_state_city_low_to_high/:keyword/:state/:city', function (req, res) {
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state is given *******************/

app.get('/state_low_to_high/:state', function (req, res) {
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { state: stateVal } },
        { $project: { _id: 0 }}, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state and categories is given *******************/

app.get('/state_categories_low_to_high/:state/:categories', function (req, res) {
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state,city  is given *******************/

app.get("/state_city_low_to_high/:state/:city", function (req, res) {
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { $and: [{ "state": stateVal }, { "city": cityVal }] } },
    { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

/******************  API when state,city and categories is given *******************/

app.get('/state_city_categories_low_to_high/:state/:city/:categories', function (req, res) {
    var categoriesVal = req.params.categories;
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
        logger();
});

app.listen(3001);
