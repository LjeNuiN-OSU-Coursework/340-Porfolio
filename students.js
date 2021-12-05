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
    function getStudent(res, mysql, context, teacherID, complete){
        var sql = "SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentID = ?";
        var inserts = [teacherID];
        db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results[0];
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
        context.jsscripts = ["searchStudent.js","deleteStudent.js"];
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
    router.get('/search', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchStudent.js","deleteStudent.js"];
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
    router.get('/:studentID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateStudent.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.studentID, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log(context)
                res.render('studentUpdate', context);
            }
    
        }
    });
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchStudent.js","deleteStudent.js"];
        var mysql = req.app.get('mysql');
        getStudentsWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context.students)
                res.render('students', context);
            }
        }
    });

    router.get('/filter/:studentClass', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchStudent.js","deleteStudent.js"];
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
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (studentFName, studentLName, studentAge, studentClass) VALUES (?,?,?,?)";
        var inserts = [req.body.studentFName, req.body.studentLName, req.body.studentAge, req.body.studentClass];
        sql = db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/students');
            }
        });
    });

    router.put('/:studentID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("boosted", req.params.studentID)
        var sql = "UPDATE Students SET studentFName=?, studentLName=? WHERE studentID=?";
        var inserts = [req.body.studentFName, req.body.studentLName, req.params.studentID]
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
    router.delete('/:studentID', function(req, res){
        console.log(req.params.studentID)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Students WHERE studentID = ?";
        var inserts = [req.params.studentID];
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