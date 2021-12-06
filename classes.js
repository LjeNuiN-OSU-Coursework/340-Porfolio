module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')


    // Citation for the following function: getTeacher
    // Date: 12/04/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getTeacher(res, mysql, context, complete){
        db.pool.query("SELECT teacherID FROM Teachers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teachers = results;
            complete();
        });
    }


    // Citation for the following function: getUnsignedTeacher
    // Date: 12/04/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getUnsignedTeacher(res, mysql, context, complete){
        db.pool.query("Select teacherID, teacherFName, teacherLName from Teachers left join Classes on Teachers.teacherID = Classes.classTeacher where Classes.classTeacher is null;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teachers = results;
            complete();
        });
    }

    // Citation for the following function: getClasses
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 5-13 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getClasses(res, mysql, context, complete){
        db.pool.query("SELECT classID, classGrade, classTeacher FROM Classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }

    // Citation for the following function: getClass
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getClass(res, mysql, context, classID, complete){
        var sql = "SELECT classID, classGrade, classTeacher FROM Classes WHERE classID = ?";
        var inserts = [classID];
        db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.class = results[0];
            complete();
        });
    }

    /*Get all classes and their data*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectClass.js", "updateClass.js","deleteClass.js"];
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classes', context);
            }

        }
    });

    /*Get a class for the purpose of an update*/
    router.get('/:classID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectTeacher.js", "updateClass.js"];
        var mysql = req.app.get('mysql');
        getClass(res, mysql, context, req.params.classID, complete);
        getUnsignedTeacher(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log(context)
                res.render('classUpdate', context);
            }
    
        }
    });

    /*Inserting a new class into the table.*/
    router.post('/', function(req, res){
        console.log(req.body.classGrade)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Classes (classGrade) VALUES (?)";
        var inserts = [req.body.classGrade];
        sql = db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.redirect('/classes');
            }
        });
    });
    
    /*Updating a specific class*/
    router.put('/:classID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("boosted", req.params.classID)
        console.log(req.params)
        console.log(req.body)
    
        var sql = "UPDATE Classes SET classGrade=?, classTeacher=? WHERE classID=?";
        var inserts = [req.body.classGrade, req.body.teacherID, req.params.classID];
        sql = db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
                
            }
        });
    });
    
    // delete
    router.delete('/:classID', function(req, res){
        console.log(req.params.classID)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Classes WHERE classID = ?";
        var inserts = [req.params.classID];
        sql = db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
    return router;
}();