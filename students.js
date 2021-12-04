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
    function getStudentsWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
         var query = "SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentFName LIKE" + db.pool.escape(req.params.s + '%');
        console.log(query)
  
        db.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.students = results;
              complete();
          });
      }
      function getStudentByClass(req, res, mysql, context, complete){
        var query = "SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentClass = ?";
        console.log(req.params)
        var inserts = [req.params.studentClass]
        db.pool.query(query, inserts, function(error, results, fields){
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
        context.jsscripts = ["searchStudent.js"];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        getClass(res, mysql, context, complete);
        console.log(context)
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('students', context);
            }

        }
    });
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchStudent.js"];
        var mysql = req.app.get('mysql');
        getStudentsWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context.student)
                res.render('students', context);
            }
        }
    });

    router.get('/filter/:studentClass', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchStudent.js"];
        var mysql = req.app.get('mysql');
        getStudentByClass(req,res, mysql, context, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('students', context);
            }

        }
    });

    return router;
}();