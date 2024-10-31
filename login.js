// List of users with their passwords and profile picture paths
const users = {
    "admin": { password: "LegacyFrom16", profilePicture: "logo.png" },
    "suhaib": { password: "LegacyFrom16", profilePicture: "suhaib.jpg" },
    "sowmik": { password: "LegacyFrom16", profilePicture: "sowmik.jpg" },
    "mir": { password: "LegacyFrom16", profilePicture: "mir.jpg" },
    "ashfaq": { password: "LegacyFrom16", profilePicture: "ashfaq.jpg" },
    "amit": { password: "LegacyFrom16", profilePicture: "amit.jpg" },
    "mahbub": { password: "LegacyFrom16", profilePicture: "mahbub.jpg" },
    "tahmid": { password: "tahmidmatinem", profilePicture: "tahmid.jpg" },
    "rafid": { password: "rafidchelebhalo", profilePicture: "rafid.jpg" },
    "rajin": { password: "agaitethakkid", profilePicture: "rajin.jpg" },
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the username exists and the password is correct
    if (users[username] && users[username].password === password) {
        // Set sessionStorage items on successful login
        sessionStorage.setItem("authenticated", "true");
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("profilePicture", users[username].profilePicture);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect username or password!");
    }
}

// Logout function to clear session data
function logout() {
    sessionStorage.removeItem("authenticated");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("profilePicture");
    window.location.href = "index.html";
}