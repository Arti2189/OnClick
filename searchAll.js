var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
var mongojs = require('mongojs');
var db = mongojs('YELP', ['yelp', 'contact','user']);
app.use(express.static(__dirname));
//service call for list users

app.get('/', function (req, res) {
    db.yelp.aggregate([{ $match: {} }, { $project: { _id: 0 } }], function (err, docs) { res.json(docs); })
});

app.get('/:id', function (req, res) {
    console.log(req.params.id);
    var uid = req.params.id;
    db.yelp.aggregate([{ $match: { "business_id": uid } }, { $project: { _id: 0 } }], function (err, docs) { res.json(docs); })
});


/****************        API for inserting contact details     *****************/
app.get('/contactus/:yourName/:Email/:Subject/:Message', function (req, res) {
    console.log(req.params.yourName);
    console.log(req.params.Email);
    console.log(req.params.Subject);
    console.log(req.params.Message);
    db.contact.insert({ "yourName": req.params.yourName, "Email": req.params.Email, "Subject": req.params.Subject, "Message": req.params.Message },
        function (err, docs) { res.json(docs); })
});

/****************        API for registering users     *****************/
app.get('/register/:username/:emailaddress/:password/:confirmpassword', function (req, res) {
    console.log(req.params.username);
    console.log(req.params.emailaddress);
    console.log(req.params.password);
    console.log(req.params.confirmpassword);
    db.user.insert({ "username": req.params.username, "emailaddress": req.params.emailaddress, "password": req.params.password, "confirmpassword": req.params.confirmpassword },
        function (err, docs) { res.json(docs); })
});

/*********************************************************** */
app.get('/categories/:categories', function (req, res) {
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/city/:city', function (req, res) {
    console.log(req.params.city);
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { city: cityVal } }, { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/city_categories/:city/:categories', function (req, res) {
    console.log(req.params.city);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword/:keyword', function (req, res) {
    console.log(req.params.keyword);
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_categories/:keyword/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([{ $match: { $and: [{ "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] }] } },
    { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_city/:keyword/:city', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.city);
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([{
        $match: { $and: [{ city: cityVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] }
    },
    { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});


app.get('/keyword_city_categories/:keyword/:city/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    console.log(req.params.city);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state/:keyword/:state', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_categories/:keyword/:state/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    console.log(req.params.state);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }], function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_city/:keyword/:state/:city', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    console.log(req.params.city);
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_city_categories/:keyword/:state/:city/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    console.log(req.params.city);
    console.log(req.params.categories);
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/state/:state', function (req, res) {
    console.log(req.params.state);
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { state: stateVal } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/state_categories/:state/:categories', function (req, res) {
    console.log(req.params.categories);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get("/state_city/:state/:city", function (req, res) {
    console.log(req.params.city);
    console.log(req.params.state);

    var stateVal = req.params.state;
    var cityVal = req.params.city;

    db.yelp.aggregate([{ $match: { $and: [{ "state": stateVal }, { "city": cityVal }] } },
    { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state/:keyword/:state', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ state: stateVal }, { categories: categoriesVal }] } },
        { $project: { _id: 0 } }],
        function (err, docs) { res.json(docs); })
});


//sort by high to low

app.get('/categories_high_to_low/:categories', function (req, res) {
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') } },
        { $project:{ _id: 0 } },
        { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});


app.get('/city_high_to_low/:city', function (req, res) {
    console.log(req.params.city);
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { city: cityVal } }, { $project:{ _id: 0 } },
    { $sort: { stars: -1 } }], function (err, docs) { res.json(docs); })
});

app.get('/city_categories_high_to_low/:city/:categories', function (req, res) {
    console.log(req.params.city);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 }}],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_high_to_low/:keyword', function (req, res) {
    console.log(req.params.keyword);
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_categories_high_to_low/:keyword/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([{ $match: { $and: [{ "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] }] } },
    { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_city_high_to_low/:keyword/:city', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.city);
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([{
        $match: { $and: [{ city: cityVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] }
    },
    { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_city_categories_high_to_low/:keyword/:city/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    console.log(req.params.city);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_high_to_low/:keyword/:state', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_categories_high_to_low/:keyword/:state/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    console.log(req.params.state);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }], function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_city_high_to_low/:keyword/:state/:city', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    console.log(req.params.city);
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }] } },
        { $project:{ _id: 0 } }, { $sort:{ stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_city_categories_high_to_low/:keyword/:state/:city/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    console.log(req.params.city);
    console.log(req.params.categories);
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/state_high_to_low/:state', function (req, res) {
    console.log(req.params.state);
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { state: stateVal } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/state_categories_high_to_low/:state/:categories', function (req, res) {
    console.log(req.params.categories);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

app.get("/state_city_high_to_low/:state/:city", function (req, res) {
    console.log(req.params.city);
    console.log(req.params.state);

    var stateVal = req.params.state;
    var cityVal = req.params.city;

    db.yelp.aggregate([{ $match: { $and: [{ "state": stateVal }, { "city": cityVal }] } },
    { $project:{ _id: 0 } }, { $sort: { stars: -1 } }], function (err, docs) { res.json(docs); })
});

app.get('/state_city_categories_high_to_low/:state/:city/:categories', function (req, res) {
    console.log(req.params.state);
    console.log(req.params.city);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: -1 } }],
        function (err, docs) { res.json(docs); })
});

//sort low to high

app.get('/categories_low_to_high/:categories', function (req, res) {
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') } },
        { $project: { _id: 0 } },
        { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/city_low_to_high/:city', function (req, res) {
    console.log(req.params.city);
    var cityVal = req.params.city;
    db.yelp.aggregate([{ $match: { city: cityVal } }, { $project: { _id: 0 } },
    { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/city_categories_low_to_high/:city/:categories', function (req, res) {
    console.log(req.params.city);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_low_to_high/:keyword', function (req, res) {
    console.log(req.params.keyword);
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*') }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_categories_low_to_high/:keyword/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([{ $match: { $and: [{ "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] }] } },
    { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_city_low_to_high/:keyword/:city', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.city);
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([{
        $match: { $and: [{ city: cityVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] }
    },
    { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_city_categories_low_to_high/:keyword/:city/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    console.log(req.params.city);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project:{ _id: 0 }}, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_low_to_high/:keyword/:state', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var keywordVal = req.params.keyword;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }] } },
        { $project:{ _id: 0 }}, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_categories_low_to_high/:keyword/:state/:categories', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.categories);
    console.log(req.params.state);
    var categoriesVal = req.params.categories;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }], function (err, docs) { res.json(docs); })
});

app.get('/keyword_state_city_low_to_high/:keyword/:state/:city', function (req, res) {
    console.log(req.params.keyword);
    console.log(req.params.state);
    console.log(req.params.city);
    var cityVal = req.params.city;
    var keywordVal = req.params.keyword;
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { $and: [{ $or: [{ "name": new RegExp('.*' + keywordVal + '.*', 'i') }, { "categories": new RegExp('.*' + keywordVal + '.*', 'i') }] }, { "state": stateVal }, { "city": cityVal }] } },
        { $project:{ _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/state_low_to_high/:state', function (req, res) {
    console.log(req.params.state);
    var stateVal = req.params.state;
    db.yelp.aggregate([
        { $match: { state: stateVal } },
        { $project: { _id: 0 }}, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});


app.get('/state_categories_low_to_high/:state/:categories', function (req, res) {
    console.log(req.params.categories);
    console.log(req.params.state);
    var stateVal = req.params.state;
    var categoriesVal = req.params.categories;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});


app.get("/state_city_low_to_high/:state/:city", function (req, res) {
    console.log(req.params.city);
    console.log(req.params.state);

    var stateVal = req.params.state;
    var cityVal = req.params.city;

    db.yelp.aggregate([{ $match: { $and: [{ "state": stateVal }, { "city": cityVal }] } },
    { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});

app.get('/state_city_categories_low_to_high/:state/:city/:categories', function (req, res) {
    console.log(req.params.state);
    console.log(req.params.city);
    console.log(req.params.categories);
    var categoriesVal = req.params.categories;
    var stateVal = req.params.state;
    var cityVal = req.params.city;
    db.yelp.aggregate([
        { $match: { $and: [{ "state": stateVal }, { "city": cityVal }, { "categories": new RegExp('.*' + categoriesVal + '.*', 'i') }] } },
        { $project: { _id: 0 } }, { $sort: { stars: 1 } }],
        function (err, docs) { res.json(docs); })
});



app.listen(3001);
console.log("server Running on port 3001");
