function updateTeacher(teacherID){
    $.ajax({
        url: '/teachers/' + teacherID,
        type: 'PUT',
        data: $('#update-teacher').serialize(),
        success: function(result){
            window.location.replace("../teachers");
        }
    })
};