

const eventsData = [
    {
        title: "St. John's Hackathon",
        description: "Compete, code, and create innovative projects with fellow students!",
        date: "2025-04-27",
        location: "St. Augustine Hall - 2nd Floor",
        image: "/Images/Hackathon.png",
        link: "/Test/Events/hackathon.html", // Link to the detailed page
        category: ["Academic","Tech"]
    },
    {
        title: "Campus Club Fair",
        description: "Explore all the clubs and organizations St. John's has to offer!",
        date: "2025-04-28",
        location: "Great Lawn",
        image: "/Images/Campus_fair.png",
        link: "/Test/Events/club_fair.html", // Link to the detailed page
        category: ["Social Activites", "Academic"]

    },
    {
        title: "Midnight Breakfast",
        description: "Fuel up with free breakfast during finals week!",
        date: "2025-05-01",
        location: "Marillac Cafeteria",
        image: "/Images/breakfast.png",
        link: "/Test/Events/midnight_breakfast.html",
        category: ["Community", "Social Activities"]
    },
    {
        title: "Intramural Basketball Finals",
        description: "Cheer for your favorite teams at the championship game!",
        date: "2025-05-03",
        location: "Carnesecca Arena",
        image: "/Images/basketball.png",
        link: "/Test/Events/basketball_finals.html",
        category: "Sports"
    },
    {
        title: "Spring Concert",
        description: "Enjoy live music performances by local bands and special guests!",
        date: "2025-05-05",
        location: "Carnesecca Plaza",
        image: "/Images/Spring_Concert.png",
        link: "/Test/Events/spring_concert.html",
        category: "Community"

    },
    {
        title: "Community Service Day",
        description: "Give back to the community with volunteer opportunities around Queens!",
        date: "2025-05-10",
        location: "Various Locations",
        image: "/Images/Community_Service.png",
        link: "/Test/Events/service_day.html",
        category: ["Community","Social Activities"]
    },
    {
        title: "St. John's Coding Bootcamp",
        description: "Join a crash course on web development and data science!",
        date: "2025-05-12",
        location: "DAC 204",
        image: "/Images/Bootcamp.png",
        link: "/Test/Events/coding_bootcamp.html",
        category: ["Academic", "Tech"]
    },
    {
        title: "Student Art Exhibition",
        description: "Discover amazing student artwork at the annual exhibition!",
        date: "2025-05-15",
        location: "Little Theatre",
        image: "/Images/Art_Exhibit.png",
        link: "/Test/Events/art_exhibition.html",
        category: ["Arts", "Community"]
    },
    {
        title: "Career Networking Night",
        description: "Connect with alumni and professionals for career opportunities!",
        date: "2025-05-18",
        location: "Bent Hall",
        image: "/Images/Career_Night.png",
        link: "/Test/Events/career_night.html",
        category: ["Academic", "Social Activities"]
    },
    {
        title: "Movie Night Under the Stars",
        description: "Enjoy a movie screening with snacks and friends!",
        date: "2025-05-20",
        location: "Great Lawn",
        image: "/Images/Movie_Night.png",
        link: "/Test/Events/movie_night.html",
        category: ["Social Activities", "Community"]
    },
    {
        title: "E-Sports Tournament",
        description: "Compete in popular games for prizes and bragging rights!",
        date: "2025-05-22",
        location: "Student Center",
        image: "/Images/Esports.png",
        link: "/Test/Events/esports_tournament.html",
        category: ["Tech", "Sports"]
    },
    {
        title: "Meditation & Wellness Workshop",
        description: "Learn mindfulness techniques to reduce stress and improve focus!",
        date: "2025-05-25",
        location: "Wellness Center",
        image: "/Images/Meditation.png",
        link: "/Test/Events/meditation_workshop.html",
        category: ["Community", "Academic"]
    }
];

function searchEvents() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('#events .event-card'); // Changed from #clubs to #events

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

document.getElementById("allBtn").addEventListener("click", () => {
    displayEvents(eventsData); // Show all events
});

document.getElementById("newEventsBtn").addEventListener("click", () => {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7); // Set the date to 7 days ahead

    // Filter events happening within the next week
    const newEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeekLater;
    });

    displayEvents(newEvents);
});

document.getElementById("socialBtn").addEventListener("click", () => {
    const filteredEvents = eventsData.filter(event => event.category.includes("Social Activities"));
    displayEvents(filteredEvents);
});

document.getElementById("academicBtn").addEventListener("click", () => {
    const filteredEvents = eventsData.filter(event => event.category.includes("Academic"));
    displayEvents(filteredEvents);
});

document.getElementById("sportsBtn").addEventListener("click", () => {
    const filteredEvents = eventsData.filter(event => event.category.includes("Sports"));
    displayEvents(filteredEvents);
});

document.getElementById("communityBtn").addEventListener("click", () => {
    const filteredEvents = eventsData.filter(event => event.category.includes("Community"));
    displayEvents(filteredEvents);
});

document.getElementById("techBtn").addEventListener("click", () => {
    const filteredEvents = eventsData.filter(event => event.category.includes("Tech"));
    displayEvents(filteredEvents);
});

document.getElementById("artsBtn").addEventListener("click", () => {
    const filteredEvents = eventsData.filter(event => event.category.includes("Arts"));
    displayEvents(filteredEvents);
});


document.addEventListener("DOMContentLoaded", () => {
    displayEvents(eventsData);
});

function displayEvents(events) {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = "";

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
            <a href="${event.link}" target="_blank" class="event-link">
                <img src="${event.image}" alt="${event.title}">
                <div class="content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                </div>
            </a>
        `;

        eventsContainer.appendChild(eventCard);
    });
}
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        document.getElementById("feedbackResponse").innerHTML = `<p>Thank you, ${name}! Your feedback has been received.</p>`;
        this.reset();
    } else {
        document.getElementById("feedbackResponse").innerHTML = `<p>Please fill out all fields.</p>`;
    }
});