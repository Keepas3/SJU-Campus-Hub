// academics.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studyGroupForm');
    const confirmation = document.getElementById('confirmationMessage');
    const requestsContainer = document.getElementById('requestsContainer');
    
    // Load existing study group requests from localStorage
    let studyGroupRequests = JSON.parse(localStorage.getItem('studyGroupRequests')) || [];
    
    // Display existing requests when page loads
    displayRequests();
        
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Collect form data
        const name = form.elements['name'].value.trim();
        const course = form.elements['course'].value.trim();
        const availability = form.elements['availability'].value.trim();
        const anythingElse = form.elements['message'].value.trim();
        const room = form.elements['room'].value.trim();

        
        // Create a new study group request object
        const newRequest = {
            Name: name,
            CourseNumber: course,
            Availability: availability,
            Room: room,
            AnythingElse: anythingElse,
            Timestamp: new Date().toLocaleString()
        };
        
        
        // Add the request to the array
        studyGroupRequests.push(newRequest);
        
        // Save to localStorage
        localStorage.setItem('studyGroupRequests', JSON.stringify(studyGroupRequests));
        
        // Reset form and show confirmation
        form.reset();
        
        // Show confirmation message
        confirmation.style.display = 'block';
        
        // Hide confirmation message after 3 seconds
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 3000);
        
        // Show all requests
        displayRequests();
    });
});

// Function to display all study group requests
function displayRequests() {
    const requestsContainer = document.getElementById('requestsContainer');
    // Load from localStorage
    const studyGroupRequests = JSON.parse(localStorage.getItem('studyGroupRequests')) || [];
    
    // Clear previous content
    requestsContainer.innerHTML = '';
    
    if (studyGroupRequests.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No study groups yet. Be the first to create one!';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '20px';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.color = '#777';
        requestsContainer.appendChild(emptyMessage);
        return;
    }
    
    // Create cards for each study group request
    studyGroupRequests.forEach((request, index) => {
        const card = document.createElement('div');
        card.classList.add('request-card');
        card.style.backgroundColor = '#f9f9f9';
        card.style.borderRadius = '8px';
        card.style.padding = '20px';
        card.style.marginBottom = '20px';
        card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        
        card.innerHTML = `
        <h3 style="color: #E53935; margin-top: 0;">${request.Name}</h3>
        <p><strong>Course:</strong> ${request.CourseNumber}</p>
        <p><strong>Availability:</strong> ${request.Availability}</p>
        <p><strong>Room:</strong> ${request.Room}</p>
        <p><strong>Notes:</strong> ${request.AnythingElse || "None"}</p>
        <p class="timestamp" style="font-size: 0.8em; color: #777; margin-bottom: 0;">
            Submitted on: ${request.Timestamp}
        </p>
        <button class="contact-btn" style="background-color: #E53935; color: white; border: none; padding: 8px 12px; margin-top: 10px; cursor: pointer; border-radius: 4px;">
            Contact
        </button>
    `;
            
        requestsContainer.appendChild(card);
        
        // Add event listener to the contact button
        const contactBtn = card.querySelector('.contact-btn');
        contactBtn.addEventListener('click', () => {
            alert(`To contact ${request.Name}, please email them through the university directory.`);
        });
    });
}

// Add a function to clear all study groups (for testing purposes)
function clearAllStudyGroups() {
    localStorage.removeItem('studyGroupRequests');
    displayRequests();
}

// Uncomment this line if you need to clear all study groups for testing
// clearAllStudyGroups();