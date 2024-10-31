// Google Sheets API setup for Content Submission
const contentSheetId = '1RZZQ8zkn-8nBl4BhH9mc6VyfWfCag1UKwZF-_mEY_s4'; // Replace with the Content Submission sheet ID
const contentApiKey = 'AIzaSyDsLbS_f-ivjmjkVym_PyOA9V3iWGQZLsM'; // Replace with the API key for Content Submission
const contentRange = 'Form Responses 1!A1:C3'; // Adjust range as needed for the Content Submission sheet

// Google Sheets API setup for Poster Submission
const posterSheetId = '1TPCgOZnkt_JMAdiAh_OVDX5sLI8JvobSS3zZbHfHfcM'; // Replace with the Poster Submission sheet ID
const posterApiKey = 'AIzaSyDsLbS_f-ivjmjkVym_PyOA9V3iWGQZLsM'; // Replace with the API key for Poster Submission
const posterRange = 'Form Responses 1!A1:C3'; // Adjust range as needed for the Poster Submission sheet

// Fetch Recent Content Submissions
function fetchRecentContentSubmissions() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${contentSheetId}/values/${contentRange}?key=${contentApiKey}`)
        .then(response => response.json())
        .then(data => {
            const contentList = document.getElementById('contentSubmissionsList');
            contentList.innerHTML = '';

            if (data.values && data.values.length > 0) {
                data.values.forEach(row => {
                    const title = row[0];
                    const link = row[1];

                    const submissionItem = document.createElement('div');
                    submissionItem.className = 'submission-item';
                    submissionItem.innerHTML = `<strong>A Content Has Been Submitted!</strong> ${title} <br> <a href="${link}" target="_blank">View Content</a>`;
                    contentList.appendChild(submissionItem);
                });
            } else {
                contentList.innerHTML = 'No content submissions found.';
            }
        })
        .catch(error => {
            console.error('Error fetching content submissions:', error);
            document.getElementById('contentSubmissionsList').innerHTML = 'Error loading content submissions.';
        });
}

// Fetch Recent Poster Submissions
function fetchRecentPosterSubmissions() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${posterSheetId}/values/${posterRange}?key=${posterApiKey}`)
        .then(response => response.json())
        .then(data => {
            const posterList = document.getElementById('posterSubmissionsList');
            posterList.innerHTML = '';

            if (data.values && data.values.length > 0) {
                data.values.forEach(row => {
                    const title = row[0];
                    const link = row[1];

                    const submissionItem = document.createElement('div');
                    submissionItem.className = 'submission-item';
                    submissionItem.innerHTML = `<strong>A Poster Has Been Submitted!</strong> ${title} <br> <a href="${link}" target="_blank">View Poster</a>`;
                    posterList.appendChild(submissionItem);
                });
            } else {
                posterList.innerHTML = 'No poster submissions found.';
            }
        })
        .catch(error => {
            console.error('Error fetching poster submissions:', error);
            document.getElementById('posterSubmissionsList').innerHTML = 'Error loading poster submissions.';
        });
}

// Authentication check
if (!sessionStorage.getItem("authenticated")) {
    window.location.href = "index.html";
} else {
    // Display user profile information
    const username = sessionStorage.getItem("username") || "admin";
    const userImage = sessionStorage.getItem("profilePicture") || "default-profile.png";

    document.getElementById("usernameDisplay").textContent = username;
    document.getElementById("userProfilePicture").src = userImage;
}

function logout() {
    sessionStorage.removeItem("authenticated");
    window.location.href = "index.html";
}

// Load recent submissions on page load
fetchRecentContentSubmissions();
fetchRecentPosterSubmissions();
