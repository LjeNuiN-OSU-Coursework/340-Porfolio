function deleteTask(taskID){
    $.ajax({
        url: '/tasks/' + taskID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

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