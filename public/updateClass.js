function updateClass(classID){
    $.ajax({
        url: '/classes/' + classID,
        type: 'PUT',
        data: $('#update-class').serialize(),
        success: function(result){
            window.location.replace("../classes");
            
        }
    })
};