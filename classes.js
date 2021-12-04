module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')


    function getClasses(res, mysql, context, complete){
        db.pool.query("SELECT classID, classGrade, classTeacher FROM Classes INNER JOIN Teachers ON Classes.classTeacher = Teachers.teacherID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classes', context);
            }

        }
    });

    return router;
}();