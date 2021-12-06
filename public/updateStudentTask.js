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