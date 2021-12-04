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