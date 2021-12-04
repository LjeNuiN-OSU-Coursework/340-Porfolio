module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')


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

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteTask.js"];
        var mysql = req.app.get('mysql');
        getTasks(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('tasks', context);
            }

        }
    });
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