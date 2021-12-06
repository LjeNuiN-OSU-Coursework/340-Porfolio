// Citation for the following function: deleteTeacher
// Date: 12/06/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'deleteperson.js' function deletePerson()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/deleteperson.js

function deleteTeacher(id){
    $.ajax({
        url: '/teachers/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};