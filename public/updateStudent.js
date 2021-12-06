// Citation for the following function: updateStudent()
// Date: 12/06/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'updateperson.js' function updatePerson()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/updateperson.js

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