function updateStudent(studentID){
    $.ajax({
        url: '/students/' + studentID,
        type: 'PUT',
        data: $('#update-student').serialize(),
        success: function(result){
            window.location.replace("../students");
        }
    })
};