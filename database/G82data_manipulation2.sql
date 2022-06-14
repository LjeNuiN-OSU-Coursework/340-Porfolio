
-------------------------------------- All Tasks Operations queries ------------------------------------------------------------------------------

-- create: Tasks
INSERT INTO Tasks (taskDescription, taskClass) VALUES (:taskDescriptioninput, :taskClass_id_from_dropdown_input)

-- read: Tasks
SELECT * FROM Tasks

-- read: Single Task for the porpose of updating and deleting
SELECT taskID, taskDescription, taskClass FROM Tasks WHERE taskID = task_id_selected

-- Select all classID to populate Class drop dwon
SELECT classID FROM Classes

-- Update: Tasks
UPDATE Tasks SET taskDescription= :taskDescription WHERE taskID= :task_id_selected

-- delete: Tasks
DELETE FROM Tasks WHERE taskID = :task_id_selected
--------------------------------------------------------------------------------------------------------------------------------------------------








-------------------------------------- All Students Operations queries --------------------------------------------------------------------------
-- create: Students
INSERT INTO Students (studentFName, studentLName, studentAge, studentClass ) VALUES 
(:studentFNameInput, :studentLNameInput, :studentAge_from_dropdown_input, :studentClass_id_from_dropdown_input)

-- read: Students
SELECT * FROM Students

-- read: Single Student for the purpose of updating and deleeting
SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentID = studentid_selected

-- read all classes for the purpose of population a down with teacherFname, teacherLName, classID on the update student page
SELECT Classes.classID, Teachers.teacherFName, Teachers.teacherLName FROM Classes LEFT JOIN Teachers on Classes.classTeacher = Teachers.teacherID

-- Select all classID to populate filter drop down. and populate the class drop down on add a class.
SELECT classID FROM Classes

-- update: Students
UPDATE Students SET studentFName = :studentFName, studentLName= :studentLName, studentClass = :studentClass_dropdown_input
WHERE studentID = :studentid_selected

-- delete: Students
DELETE FROM Students WHERE studentID = :studentid_selected

-- Search by Student first name
SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentFName LIKE :student_FName_input

-- Filter students by claass
SELECT studentID, studentFName, studentLName, studentAge, studentClass FROM Students WHERE studentClass = : classID_from_dropdown_input
--------------------------------------------------------------------------------------------------------------------------------------------------









-------------------------------------- All studentTasks Operations queries -----------------------------------------------------------------------
-- create: studentTasks -- associate a charstudent with a task (M-to-M relationship addition)
INSERT INTO studentTasks (studentTasksSid, studentTasksTid ) VALUES (:studentTasksSid_dropdown_input, :studentTasksTid_dropdown_input,)

-- read: studentTasks
SELECT * FROM studentTasks

-- select students for purpose of populating student drop down with studentFName,studentLName, studentID to make a studentTasksSid_dropdown
SELECT studentID, studentFName, studentLName from Students

-- select Tasks for purpose of populating tasks drop down with taskID,taskDescription to make a studentTasksTid_dropdown
SELECT taskID, taskDescription from Tasks


-- select student task for the purpose of updating and deleting
SELECT * FROM studentTasks WHERE studentTasksSid = :studentTasksSid_selected AND studentTasksTid= :studentTasksTid_selected

-- update: studentTasks
PDATE studentTasks SET studentTasksCompletion=:studentTasksCompletion_input WHERE studentTasksSid=studentTasksSid_selected AND studentTasksTid=:studentTasksTid_selected


-- delete: studentTasks (M:M relationship deletion) dis-associate a task from a student
DELETE FROM studentTasks WHERE studentTasksTid = :studentTasksTid_selected AND studentTasksSid = :studentTasksSid_selected
-----------------------------------------------------------------------------------------------------------------------------------------------------








-------------------------------------- All Classes Operations queries -------------------------------------------------------------------------------
-- create: Classes
INSERT INTO Classes (classGrade) VALUES (:classGrade_input, :classTeacher_unassgined_from_dropdown)

-- read: Classes
SELECT * FROM Classes

--- select a single class for the purpose of updating and deleting
SELECT classID, classGrade, classTeacher FROM Classes WHERE classID = :classID_selected


-- select teachers for the purpose of populating teacher drop down on update page to only show classes with an unassigned teacher
Select teacherID, teacherFName, teacherLName from Teachers left join Classes on Teachers.teacherID = Classes.classTeacher where Classes.classTeacher is null;

-- update: Classes
UPDATE Classes SET classGrade = :classGradeInput, classTeacher = :classTeacher_unassgined_from_dropdown WHERE classID = :classID_selected

-- delete: Classes
DELETE FROM Classes WHERE classID = :classID_selected
-----------------------------------------------------------------------------------------------------------------------









-------------------------------------- All Teachers Operations queries --------------------------------------------------------
-- create: Teachers
INSERT INTO Teachers (teacherFName, teacherLName) VALUES 
(:teacherFNameInput, :teacherLNameInput)

-- read: Teachers
SELECT * FROM Teachers

-- selecte single Teacher for the purpose of updating and deleting
SELECT teacherID, teacherFname, teacherLname FROM Teachers WHERE teacherID = teacherId_selected

-- update: Teachers
UPDATE Teachers SET teacherFName = :teacherFNameINput, teacherLName= :teacherLNameInput
WHERE teacherID = :teacherId_selected

-- delete: Teachers
DELETE FROM Teachers WHERE teacherID = :teacherId_selected
-----------------------------------------------------------------------------------------------------------------------