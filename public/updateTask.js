// Citation for the following function: updateTask()
// Date: 12/02/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'updateperson.js' function updatePerson()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/updateperson.js

function updateTask(taskID){
    $.ajax({
        url: '/tasks/' + taskID,
        type: 'PUT',
        data: $('#update-task').serialize(),
        success: function(result){
            window.location.replace("../tasks");
            
        }
    })
};