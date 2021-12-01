-- These are some Database Manipulation queries for a partially implemented Project Website

-- create: Tasks
INSERT INTO Tasks (taskDescription, taskClass) VALUES (:taskDescription, :taskClass)
-- read: Tasks
SELECT * FROM Tasks
-- update: Tasks

UPDATE Tasks SET taskDescripion = :taskDescripion, taskClass = :taskClass 
WHERE taskID = :taskIDUpdateForm
-- delete: Tasks
DELETE FROM Tasks WHERE taskID = :taskIDUpdateForm

-- create: Students
INSERT INTO Students (studentFName, studentLName, studentAge, studentGrade, studentClass, studentTeacher) VALUES 
(:studentFName, :studentLName, :studentAge, :studentGrade, :studentClass, :studentTeacher)
-- read: Students
SELECT * FROM Students
-- update: Students
UPDATE Students SET studentFName = :studentFName, studentLName= :studentLName, studentAge = :studentAge, 
studentGrade = :studentGrade, studentClass = :studentClass, studentTeacher = :studentTeacher
WHERE studentID = :studentIDUpdateForm
-- delete: Students
DELETE FROM Students WHERE studentID = :studentIDUpdateForm

-- create: studentTasks
INSERT INTO studentTasks (studentTasksSid, studentTasksTid, studentTasksCompletion ) VALUES (:studentTasksSid, :studentTasksTid, studentTasksCompletion)
-- read: studentTasks
SELECT * FROM studentTasks
-- update: studentTasks
UPDATE studentTasks SET studentTasksSid = :studentTasksSid, studentTasksTid = :studentTasksTid, studentTasksCompletion = :studentTasksCompletion  
WHERE studentID = :StudentIDUpdateForm
-- delete: studentTasks
DELETE FROM studenttasks WHERE studentTasksSid = :studentTasksSidUpdateForm

-- create: Classes
INSERT INTO Classes (classGrade, classTeacher) VALUES (:classGrade, :classTeacher)
-- read: Classes
SELECT * FROM Classes
-- update: Classes
UPDATE Classes SET classGrade = :classGrade, classTeacher = :classTeacher WHERE sun_exposure_ID = :sun_exposure_ID_from_the_update_form
-- delete: Classes
DELETE FROM Classes WHERE classID = :classIDUpdateForm

-- create: Teachers
INSERT INTO Teachers (teacherFName, teacherLName, teacherGrade, teacherClass) VALUES 
(:teacherFName, :teacherLName, :teacherGrade, :teacherClass)
-- read: Teachers
SELECT * FROM Teachers
-- update: Teachers
UPDATE Teachers SET teacherFName = :teacherFName, teacherLName= :teacherLName, teacherGrade = :teacherGrade, 
teacherClass = :teacherClass
WHERE teacherID = :teacherIDUpdateForm
-- delete: Teachers
DELETE FROM Teachers WHERE teacherID = :teacherIDUpdateForm
