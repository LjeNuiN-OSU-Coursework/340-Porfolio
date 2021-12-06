module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')

    function getStudents(res, mysql, context, complete){
        db.pool.query("SELECT studentID, studentFName, studentLName from Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    /* get certificates to populate in dropdown */
    function getTasks(res, mysql, context, complete){
        sql = "SELECT taskID, taskDescription from Tasks";
        db.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.tasks = results
            complete();
        });
    }
    function getStudentTasks(res, mysql, context, complete){
        db.pool.query("SELECT * FROM studentTasks", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studenttasks = results;
            complete();
        });
    }
    function getStudentTask(res, mysql, context,studentTasksSid, studentTasksTid, complete){
        var inserts = [studentTasksSid,studentTasksTid];
        db.pool.query("SELECT * FROM studentTasks WHERE studentTasksSid =? AND studentTasksTid=?",inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studenttasks = results;
            complete();
        });
    }

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteTask.js"]
        var mysql = req.app.get('mysql');
        getStudentTasks(res, mysql, context, complete);
        getTasks(res, mysql, context, complete);
        getStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('studenttasks', context);
            }

        }
    });
    router.get('/:studentID/:taskID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateStudentTask.js"]
        var mysql = req.app.get('mysql');
        getStudentTask(res, mysql, context, req.params.studentID, req.params.taskID ,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context.studenttasks)
                console.log(context)
                res.render('studentTasksUpdate', context);
            }

        }
    });
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO studentTasks (studentTasksSid, studentTasksTid) VALUES (?,?)";
        console.log(req.body,req.params)
        var inserts = [req.body.studentID, req.body.taskID];
        sql = db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/studentTasks');
            }
        });
    });

    router.put('/:studentTasksSid/:studentTasksTid', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("boosted", req.params.studentTasksSid, req.params.studentTasksTid)
        var sql = "UPDATE studentTasks SET studentTasksCompletion=? WHERE studentTasksSid=?, studentTasksTid=?";
        var inserts = [req.body.studentTasksCompletion, req.params.studentTasksSid, req.params.studentTasksTid]
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

    router.delete('/studentTasksTid/:studentTasksTid/studentTasksSid/:studentTasksSid', function(req, res){
        console.log(req)
        console.log(req.params.studentTasksTid)
        console.log(req.params.studentTasksSid)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM studentTasks WHERE studentTasksTid = ? AND studentTasksSid = ?";
        var inserts = [req.params.studentTasksTid, req.params.studentTasksSid];
        sql = db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
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