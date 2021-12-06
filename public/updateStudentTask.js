function updateStudentTasks(studentTasksSid,studentTasksTid){
    $.ajax({
        url: '/studenttasks/' + studentTasksSid +'/' + studentTasksTid,
        type: 'PUT',
        data: $('#update-studenttask').serialize(),
        success: function(result){
            window.location.replace("../studenttasks");
        }
    })
};