module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')

    // Citation for the following function: getClass
    // Date: 12/05/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 5-14 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getClass(res, mysql, context, complete){
        db.pool.query("SELECT Classes.classID, Teachers.teacherLName FROM Classes LEFT JOIN Teachers on Classes.classTeacher = Teachers.teacherID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }

    // Citation for the following function: getClass
    // Date: 12/05/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 16-25 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getTeachers(res, mysql, context, complete){
        db.pool.query("SELECT * FROM Teachers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teachers = results;
            complete();
        });
    }

    // Citation for the following function: getClass
    // Date: 12/05/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getTeacher(res, mysql, context, teacherID, complete){
        var sql = "SELECT teacherID, teacherFname, teacherLname FROM Teachers WHERE teacherID = ?";
        var inserts = [teacherID];
        db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }

    // Citation for the following code lines 62-152
    // Date: 12/05/2021
    // Adapted from: knightsamar github cs340_sample_nodejs_app people.js lines 72-86, 123-137, 141-156, 160-176 180-197
    // followed ways to use router for get, put, post, delete
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js 

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        context.jsscripts = ["deleteTeacher.js"]
        getClass(res, mysql, context, complete);
        getTeachers(res, mysql, context, complete);
        console.log(context)
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('teachers', context);
            }

        }
    });
    
    /* Display one person for the specific purpose of updating people */

    router.get('/:teacherID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectClass.js", "updateTeacher.js"];
        var mysql = req.app.get('mysql');
        getTeacher(res, mysql, context, req.params.teacherID, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log(context)
                res.render('teacherUpdate', context);
            }

        }
    });

    router.post('/', function(req, res){
        console.log(req.body.teacherFname)
        console.log(req.body.teacherLname)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Teachers (teacherFname, teacherLname) VALUES (?,?)";
        var inserts = [req.body.teacherFname, req.body.teacherLname];
        sql = db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/teachers');
            }
        });
    });

    router.put('/:teacherID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("boosted", req.params.teacherID)
        var sql = "UPDATE Teachers SET teacherFname=?, teacherLname=? WHERE teacherID=?";
        var inserts = [req.body.teacherFname, req.body.teacherLname, req.params.teacherID]
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

    router.delete('/:teacherID', function(req, res){
        console.log(req.params.teacherID)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Teachers WHERE teacherID = ?";
        var inserts = [req.params.teacherID];
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