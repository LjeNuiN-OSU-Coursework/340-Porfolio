module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')


    function getClass(res, mysql, context, complete){
        db.pool.query("SELECT classID FROM Classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }

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
    function getTeacher(res, mysql, context, teacherID, complete){
        var sql = "SELECT teacherID, teacherFname, teacherLname, teacherGrade, teacherClass FROM Teachers WHERE teacherID = ?";
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
    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        context.jsscripts = ["deleteTeacher.js"]
        getClass(res, mysql, context, complete);
        getTeachers(res, mysql, context, complete);
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
        var sql = "INSERT INTO Teachers (teacherFname, teacherLname, teacherGrade) VALUES (?,?,?)";
        var inserts = [req.body.teacherFname, req.body.teacherLname, req.body.teacherGrade];
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
        var sql = "UPDATE Teachers SET teacherFname=?, teacherLname=?, teacherGrade=?, teacherClass=? WHERE teacherID=?";
        var inserts = [req.body.teacherFname, req.body.teacherLname, req.body.teacherGrade, req.body.teacherClass, req.params.teacherID]
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