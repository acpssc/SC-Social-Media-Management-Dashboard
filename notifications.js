// Function to send notification email (simulated)
function sendNotification(email, event) {
    console.log(`Notification sent to ${email}: Remember the upcoming event: ${event.title} on ${event.date}.`);
}

// Function to check for notifications
function checkForNotifications() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = ''; // Clear previous notifications

    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
        return; // Exit if no email is saved
    }

    for (const [month, events] of Object.entries(scheduleData)) {
        events.forEach(event => {
            const eventDate = new Date(`${month} ${event.date} 2024`); // Assume the year is 2024
            if (eventDate.toDateString() === tomorrow.toDateString()) {
                sendNotification(userEmail, event);
                const listItem = document.createElement('li');
                listItem.textContent = `Upcoming: ${event.title} on ${event.date} ${month}`;
                notificationList.appendChild(listItem);
            }
        });
    }
}

// Event listener for email submission
document.getElementById('notificationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const userEmail = document.getElementById('userEmail').value;

    // Save email in local storage
    localStorage.setItem('userEmail', userEmail);
    document.getElementById('notificationStatus').innerText = "Email saved! You will receive notifications.";
    
    // Check notifications immediately after saving email
    checkForNotifications();
});

// Check for notifications when the page loads
window.onload = function() {
    checkForNotifications();
};
