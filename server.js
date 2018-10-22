var express = require('express');
var pgp = require('pg-promise')();
// var db = pgp(process.env.DATABASE_URL);
var db = pgp('postgres://vxjopouelszoqp:b38107853d55cfcfb5ec84d98b68feb33b5b5dad7fae2fa12a9484f47bad97d1@ec2-54-243-147-162.compute-1.amazonaws.com:5432/d28vk975k8u2um?ssl=true');
var app =express();
var bodyParser = require('body-parser');
var moment = require('moment');
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
//แก้ไขproduct
app.get('/products/:pid', function(req, res) {
    var pid =req.params.pid;
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var sql ="select * from products where product_id=" + pid;
    db.any(sql)
    .then(function(data){
        res.render('pages/product_edit',{products : data[0],time : time})
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
});

//แก้ไขuser
app.get('/users/:uid', function(req, res) {
    var uid =req.params.uid;
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var sql ="select * from users where user_id=" + uid;
    db.any(sql)
    .then(function(data){
        res.render('pages/user_edit',{users : data[0],time : time})
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
   
    db.any(sql+' order by product_id ASC')
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/products',{products : data})
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
});
app.get('/users/:user_id', function(req, res) {
    var user_id = req.param('user_id');
    var sql ='select * from users';
    if(user_id){
        sql += ' where user_id =' +id;
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
   
    db.any(sql+' order by user_id ASC')
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
var product_id = req.body.product_id;
var title = req.body.title;
var price = req.body.price;
var sql = `update products set title = '${title}',price = '${price}' where product_id = '${product_id}'`;
//db.none
db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/products')

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});
app.post('/user/update', function (req, res) {
    var user_id = req.body.user_id;
    var email = req.body.email;
    var password = req.body.password;
    var sql = `update users set email = '${email}', password = '${password}' where user_id = '${user_id}' `;
    db.none(sql);
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/users');
        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});

//delete product in edit
app.get('/product_delete/:product_id', function (req, res) {
    var product_id = req.params.product_id;
    var sql = 'DELETE FROM products';
    if (product_id) {
        sql += ' where product_id =' + product_id;
    }
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/products');

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});
//delete user in edit
app.get('/user_delete/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var sql = 'DELETE FROM users';
    if (user_id) {
        sql += ' where user_id =' + user_id;
    }
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/users');

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});

//add new product
app.get('/newproduct', function (req, res) {
    res.render('pages/addnewproduct');
})
app.post('/addnewproduct', function (req, res) {
    var product_id = req.body.product_id;
    var title = req.body.title;
    var price = req.body.price;
    var sql = `INSERT INTO products (product_id, title, price)
    VALUES ('${product_id}', '${title}', '${price}')`;
    //db.none
    console.log('UPDATE:' + sql);
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/products')

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })

})
//add new user
app.get('/newuser', function (req, res) {
    res.render('pages/addnewuser');
})

app.post('/addnewuser', function (req, res) {
    var user_id = req.body.user_id;
    var email = req.body.email;
    var password = req.body.password;
    var sql = `INSERT INTO users (user_id, email, password)
    VALUES ('${user_id}', '${email}', '${password}')`;
    //db.none
    console.log('UPDATE:' + sql);
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/users')
        })

        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});

app.get('/report_products', function (req, res) {
    var sql = 'select * from products order by price DESC limit 10';
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.render('pages/report_products',{products : data})
        })

        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});

app.get('/report_users', function (req, res) {
    var sql = 'select users.email,purchases.name,products.title,purchase_items.quantity,purchase_items.price*purchase_items.quantity as total FROM users INNER JOIN purchases ON purchases.user_id = users.user_id INNER JOIN purchase_items ON purchase_items.purchase_id=purchases.purchase_id   INNER JOIN products ON products.product_id = purchase_items.product_id order by purchase_items.price*purchase_items.quantity DESC limit 20';
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.render('pages/report_users',{users : data})
        })

        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('App is running on http://localhost:' + port);
});