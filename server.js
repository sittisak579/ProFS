var express = require('express');
var pgp = require('pg-promise')();
var db = pgp('postgres://nkwnjxuiidwrns:b72b4de42f726173c9acee8a85dd10ed1c8dc1a2ab7402a6feebbbccb8b14f85@ec2-54-163-245-44.compute-1.amazonaws.com:5432/d34ii1v5fr4h1e?ssl=true');
var app =express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/about', function(req, res) {
    var name ="Sittisak Phetkaew";
    var hobbies =['game','Movie'];
    var bdate ='08/03/1997'
    res.render('pages/about',{Fullname :name,hobbies :hobbies,bdate :bdate});
});
app.get('/products/:pid', function(req, res) {
    var pid =req.params.pid;
    var sql ="select * from products where id=" + pid;
    db.any(sql)
    .then(function(data){
        res.render('pages/product_edit',{products : data[0]})
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
});
app.get('/products/:ptitle', function(req, res) {
    var ptitle =req.params.ptitle;
    var sql ="select * from products where title=" + ptitle;
    db.any(sql)
    .then(function(data){
        res.render('pages/product_edit',{products : data[0]})
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
});
app.get('/products/:pprice', function(req, res) {
    var pprice =req.params.pprice;
    var sql ="select * from products where pprice=" + pprice;
    db.any(sql)
    .then(function(data){
        res.render('pages/product_edit',{products : data[0]})
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
});
//     var id = req.param('id');
//     var sql ='select * from products';
//     if(id){
//         sql += ' where id =' +id;
//     }
    
//     db.any(sql)
//         .then(function(data){
//             console.log('DATA:'+data);
//             res.render('pages/products',{products : data})
//         })
//         .catch(function(error){
//             console.log('ERROR:'+error);
//         })
// });
app.get('/products/', function(req, res) {
    
    var sql ='select * from products';
   
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/products',{products : data})
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
});
app.get('/users/:id', function(req, res) {
    var id = req.param('id');
    var sql ='select * from users';
    if(id){
        sql += ' where id =' +id;
    }
    
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/users',{users : data})
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
});
app.get('/users/', function(req, res) {
    
    var sql ='select * from users';
   
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/users',{users : data})
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
});
app.get('/Education', function(req, res) {
    res.render('pages/Education');
});
//update data
app.post('/products/update',function(req, res){
var id = req.body.id;
var title = req.body.title;
var price = req.body.price;
var sql = `update product set title = ${title},price = ${price} where id = ${id}`;
//db.none
console.log('UPDATE:'+ sql);
res.redirect('/products');
});



var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('App is running on http://localhost:' + port);
});