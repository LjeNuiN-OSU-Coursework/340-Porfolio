function searchStudentByFirstName() {
    //get the first name 
    var first_name_search_string  = document.getElementById('first_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/students/search/' + encodeURI(first_name_search_string)
}

function filterStudentByClass() {
    //get the id of the selected homeworld from the filter dropdown
    var studentClass = document.getElementById('class_filter').value
    //construct the URL and redirect to it
    window.location = '/students/filter/' + parseInt(studentClass)
}