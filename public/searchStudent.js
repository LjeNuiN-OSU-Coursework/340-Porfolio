// Citation for the following function: searchStudentByFirstName()
// Date: 12/04/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'searchperson.js' function searchPeopleByFirstName()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/searchpeople.js

function searchStudentByFirstName() {
    //get the first name of student
    var first_name_search_string  = document.getElementById('first_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/students/search/' + encodeURI(first_name_search_string)
}


// Citation for the following function: filterStudentByClass
// Date: 12/04/2021
// Based on: knightsamar's 340_sample_nodejs_app github, for 'filterpeople.js' function filterPeopleByHomeworld()
// Source URL: https://github.com/knightsamar/cs340_sample_nodejs_app/blob/master/public/filterpeople.js

function filterStudentByClass() {
    //get the id of the selected class from the filter dropdown
    var studentClass = document.getElementById('class_filter').value
    //construct the URL and redirect to it
    window.location = '/students/filter/' + parseInt(studentClass)
}