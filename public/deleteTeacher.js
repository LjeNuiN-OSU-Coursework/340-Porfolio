function deleteTeacher(id){
    $.ajax({
        url: '/teachers/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};