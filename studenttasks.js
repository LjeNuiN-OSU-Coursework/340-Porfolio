module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')

    // Citation for the following function: getStudents (studentID dropdown)
    // Date: 12/05/2021
    // Adapted from: knightsamar people_certs.js from cs340_sample_nodejs_app lines 6-15 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people_certs.js

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

    // Citation for the following function: getTasks (classID drop down)
    // Date: 12/05/2021
    // Adapted from: knightsamar people_certs.js from cs340_sample_nodejs_app lines 18-28 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people_certs.js

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

    // Citation for the following function: getStudentTasks
    // Date: 12/05/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 16-25 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

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

    // Citation for the following function: getStudentTask
    // Date: 12/05/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getStudentTask(res, mysql, context,studentTasksSid, studentTasksTid, complete){
        var inserts = [studentTasksSid,studentTasksTid];
        db.pool.query("SELECT * FROM studentTasks WHERE studentTasksSid =? AND studentTasksTid=?",inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studenttasks = results[0];
            complete();
        });
    }

    // Citation for the following code lines 81-174
    // Date: 12/05/2021
    // Adapted from: knightsamar github cs340_sample_nodejs_app people_certs.js lines 50-118
    // followed ways to use router for get, put, post, delete
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people_certs.js

    /*Display all Student Tasks, which is a cross table of students and tasks*/
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

    /*Get specific student task to update variable.*/
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

    /*Insert new student task based off a Student ID and Task ID.*/
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

    /*Update a student task that matches the Student Id and Task ID*/
    router.put('/:studentTasksSid/:studentTasksTid', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("working", req.params.studentTasksSid, req.params.studentTasksTid)
        var sql = "UPDATE studentTasks SET studentTasksCompletion=? WHERE studentTasksSid=? AND studentTasksTid=?";
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

    /*Delete a student task*/
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