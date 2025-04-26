

const eventsData = [
    {
        title: "St. John's Hackathon",
        description: "Compete, code, and create innovative projects with fellow students!",
        date: "2025-04-27",
        location: "St. Augustine Hall - 2nd Floor",
        image: "/Images/Hackathon.png",
        link: "hackathon.html" // Link to the detailed page
    },
    {
        title: "Campus Club Fair",
        description: "Explore all the clubs and organizations St. John's has to offer!",
        date: "2025-04-28",
        location: "Great Lawn",
        image: "/Images/Campus_fair.png",
        link: "club_fair.html" // Link to the detailed page
    },
    {
        title: "Midnight Breakfast",
        description: "Fuel up with free breakfast during finals week!",
        date: "2025-05-01",
        location: "Marillac Cafeteria",
        image: "/Images/breakfast.png",
        link: "midnight_breakfast.html"
    },
    {
        title: "Intramural Basketball Finals",
        description: "Cheer for your favorite teams at the championship game!",
        date: "2025-05-03",
        location: "Carnesecca Arena",
        image: "/Images/basketball.png",
        link: "basketball_finals.html"
    },
    {
        title: "Spring Concert",
        description: "Enjoy live music performances by local bands and special guests!",
        date: "2025-05-05",
        location: "Carnesecca Plaza",
        image: "/Images/Spring_Concert.png",
        link: "spring_concert.html"
    },
    {
        title: "Community Service Day",
        description: "Give back to the community with volunteer opportunities around Queens!",
        date: "2025-05-10",
        location: "Various Locations",
        image: "/Images/Community_Service.png",
        link: "service_day.html"
    }
];


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