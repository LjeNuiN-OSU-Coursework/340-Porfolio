// Citation for the following function: deleteStudent
// Date: 12/01/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'deleteperson.js', function deletePerson
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/deleteperson.js

function deleteStudent(id){
    $.ajax({
        url: '/students/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};