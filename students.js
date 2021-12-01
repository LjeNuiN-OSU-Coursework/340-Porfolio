module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')


    function getStudents(res, mysql, context, complete){
        db.pool.query("SELECT * FROM Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    /*Display all students.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        console.log(context)
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('students', context);
            }

        }
    });

    return router;
}();