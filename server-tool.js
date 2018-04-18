var mysql = require('mysql');
var bodyParser = require('body-parser');
var request = require('request');
var express = require('express')
var app = express();

var apiRoutes = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 获取用户信息API入口
apiRoutes.post('/', function(req, res) {
    var connection = mysql.createConnection({
        host: '172.16.200.113',
        user: 'root',
        password: 'hongte888',
        database: 'tuandai_bm', // _production
        port: 3306
    });
    connection.connect();
    var obj = { error: 1, appData: null };
    var sql = `select reserve_F as token ,user_no from tb_user where USER_ID = '${req.body.userName}'`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0) {
            var appData = {
                "Ip": '127.0.0.1',
                "SystemName": 'windows',
                "Version": '2.0.0',
                "Token": rows[0]['token'],
                "UserId": rows[0]['user_no']
            };
            obj.error = 0;
            obj.appData = appData;
        }
        connection.end();
        res.send(obj);
    });
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', apiRoutes);

app.listen('3000', function(err){
    console.log('start');
});