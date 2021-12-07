// Citation for the following function: updateStudentTask()
// Date: 12/06/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'updateperson.js' function updatePerson()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/updateperson.js

function updateStudentTasks(studentTasksSid,studentTasksTid){
    console.log(studentTasksSid,studentTasksTid)
    $.ajax({
        url: '/studenttasks/' + studentTasksSid +'/' + studentTasksTid,
        type: 'PUT',
        data: $('#update-studenttasks').serialize(),
        success: function(result){
            window.location.replace("/studenttasks");
        }
    })
};