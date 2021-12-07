module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')


    // Citation for the following function: getClass
    // Date: 12/04/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 16-25 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getTasks(res, mysql, context, complete){
        db.pool.query("SELECT * FROM Tasks", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.tasks = results;
            complete();
        });
    }

    // Citation for the following function: getClass
    // Date: 12/04/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people_certs.js

    function getTask(res, mysql, context, taskID, complete){
        var sql = "SELECT taskID, taskDescription, taskClass FROM Tasks WHERE taskID = ?";
        var inserts = [taskID];
        db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.task = results[0];
            complete();
        });
    }

    // Citation for the following function: getClass
    // Date: 12/04/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 5-14 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

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


    // Citation for the following code lines 65-167
    // Date: 12/04/2021
    // Adapted from: knightsamar github cs340_sample_nodejs_app people.js lines 72-86, 123-137, 141-156, 160-176 180-197
    // followed ways to use router for get, put, post, delete
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js 


    /*Display all tasks.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteTask.js"];
        var mysql = req.app.get('mysql');
        getClass(res,mysql,context,complete);
        getTasks(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('tasks', context);
            }

        }
    });

    /*Get task to update.*/
    router.get('/:taskID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateTask.js"];
        var mysql = req.app.get('mysql');
        getTask(res, mysql, context, req.params.taskID, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log(context)
                res.render('taskUpdate', context);
            }
    
        }
    });
    
    
      /*Insertion of a task.*/
      router.post('/', function(req, res){
        console.log(req.body.teacherFname)
        console.log(req.body.teacherLname)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Tasks (taskDescription, taskClass) VALUES (?,?)";
        var inserts = [req.body.taskDescription, req.body.taskClass];
        sql = db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/tasks');
            }
        });
    });

    /*Update of a task.*/
    router.put('/:taskID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("boosted", req.params.taskID)
        var sql = "UPDATE Tasks SET taskDescription=? WHERE taskID=?";
        var inserts = [req.body.taskDescription, req.params.taskID]
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

    /*Deletion of a task.*/
    router.delete('/:taskID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Tasks WHERE taskID = ?";
        var inserts = [req.params.taskID];
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