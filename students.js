module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var db = require('./database/db-connector')

    // Citation for the following function: getClass
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 5-14 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getClass(res, mysql, context, complete){
        db.pool.query("SELECT Classes.classID, Teachers.teacherFName, Teachers.teacherLName FROM Classes LEFT JOIN Teachers on Classes.classTeacher = Teachers.teacherID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }

    // Citation for the following function: getStudent
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 57-68 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getStudent(res, mysql, context, studentID, complete){
        var sql = "SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentID = ?";
        var inserts = [studentID];
        db.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results[0];
            complete();
        });
    }

    // Citation for the following function: getStudents
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 16-25 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

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

    // Citation for the following function: getStudentsWithNameLike
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 42-55 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

    function getStudentsWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character - comment from github source posted above
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

    // Citation for the following function: getStudentByClass
    // Date: 12/02/2021
    // Adapted from: knightsamar people.js from cs340_sample_nodejs_app lines 27-39 function
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js

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
    

    // Citation for the following code lines 103-243
    // Date: 12/02/2021
    // Adapted from: knightsamar github cs340_sample_nodejs_app people.js lines 72-197
    // followed ways to use router for get, put, search, post, delete
    // Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/people.js 
    
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
                console.log(context)
                res.render('students', context);
            }

        }
    });

    /*Display all students when search is empty*/
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

    /*Display student for purpose of update.*/
    router.get('/:studentID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateStudent.js", "selectClass.js"];
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

    /*Display all students matching search query of first name.*/
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

    /*Display all students matching filter of class ID.*/
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

    /*Insert new student*/
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

    /*Update new student*/
    router.put('/:studentID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("boosted", req.body,"ouch" ,req.params.studentID)
        var sql = "UPDATE Students SET studentFName=?, studentLName=?, studentClass=? WHERE studentID=?";
        var inserts = [req.body.studentFName, req.body.studentLName, req.body.studentClass, req.params.studentID]
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

    /*Delete a student*/
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