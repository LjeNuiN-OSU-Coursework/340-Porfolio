// Citation for the following function: deleteTask
// Date: 12/01/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'deleteperson.js' function deletePerson()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/deleteperson.js

function deleteTask(taskID){
    $.ajax({
        url: '/tasks/' + taskID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


// Citation for the following function: deleteStudentTask
// Date: 12/03/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'deleteperson.js', function deletePeopleCert()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/deleteperson.js

function deleteStudentTask(studentTasksTid, studentTasksSid){
    $.ajax({
        url: '/studenttasks/studentTasksTid/' + studentTasksTid + '/studentTasksSid/' + studentTasksSid,
        type: 'DELETE',
        success: function(result){
            if(result.responseText != undefined){
              alert(result.responseText)
            }
            else {
              window.location.reload(true)
            } 
        }
    })
  };