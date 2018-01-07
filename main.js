
//handles the events when the add button is clicked to save the issues
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//function to assign user variables to created variables- chance will generate an id #
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';
       
    //set an initial issue object 
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
       
    //set up localStorage and check if it has issue objects to display
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }   else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }   

    //reset inputs
    document.getElementById('issueInputForm').reset();

    //regenerate and add new issues
    fetchIssues();

    //prevent form from submitting
    e.preventDefault();
}

//close button- put everything in an array and close it
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i =0; i < issues.length; i++) {
        if(issues[i].id == id){
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

//delete button- put everything in an array and delete it
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

    //function to use the browers' localStorage to get the issues added
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesListe = document.getElementById('issuesList');

    //initializing the contents
    issuesList.innerHTML = '';

    //a loop to go through the array of issues variables
    for (var i = 0; i < issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        
        // generated output
        issuesList.innerHTML +=   '<div class="well">' +
                                  '<h6>Issue ID: ' + id + '</h6>' +
                                  '<p><span class="label label-info">' + status + '</span></p>' +
                                  '<h3> ' + desc + '</h3>' +
                                  '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                                  '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                  '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                                  '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                  '</div>';
                                  
    }
}