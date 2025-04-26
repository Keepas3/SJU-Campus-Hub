const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar(currentMonth, currentYear);
});

// Sample eventsData (Make sure this exists globally in your project)
const eventsData = [
    {
        title: "St. John's Hackathon",
        description: "Compete, code, and create innovative projects with fellow students!",
        date: "2025-04-27",
        location: "St. Augustine Hall - 2nd Floor",
        image: "/Images/Hackathon.png",
        link: "hackathon.html", // Link to the detailed page
        category: ["Academic","Tech"]
    },
    {
        title: "Campus Club Fair",
        description: "Explore all the clubs and organizations St. John's has to offer!",
        date: "2025-04-28",
        location: "Great Lawn",
        image: "/Images/Campus_fair.png",
        link: "club_fair.html", // Link to the detailed page
        category: ["Social Activites", "Academic"]

    },
    {
        title: "Midnight Breakfast",
        description: "Fuel up with free breakfast during finals week!",
        date: "2025-05-01",
        location: "Marillac Cafeteria",
        image: "/Images/breakfast.png",
        link: "midnight_breakfast.html",
        category: ["Community", "Social Activities"]
    },
    {
        title: "Intramural Basketball Finals",
        description: "Cheer for your favorite teams at the championship game!",
        date: "2025-05-03",
        location: "Carnesecca Arena",
        image: "/Images/basketball.png",
        link: "basketball_finals.html",
        category: "Sports"
    },
    {
        title: "Spring Concert",
        description: "Enjoy live music performances by local bands and special guests!",
        date: "2025-05-05",
        location: "Carnesecca Plaza",
        image: "/Images/Spring_Concert.png",
        link: "spring_concert.html",
        category: "Community"

    },
    {
        title: "Community Service Day",
        description: "Give back to the community with volunteer opportunities around Queens!",
        date: "2025-05-10",
        location: "Various Locations",
        image: "/Images/Community_Service.png",
        link: "service_day.html",
        category: ["Community","Social Activities"]
    },
    {
        title: "St. John's Coding Bootcamp",
        description: "Join a crash course on web development and data science!",
        date: "2025-05-12",
        location: "DAC 204",
        link: "coding_bootcamp.html",
        category: ["Academic", "Tech"]
    },
    {
        title: "Student Art Exhibition",
        description: "Discover amazing student artwork at the annual exhibition!",
        date: "2025-05-15",
        location: "Little Theatre",
        link: "art_exhibition.html",
        category: ["Arts", "Community"]
    },
    {
        title: "Career Networking Night",
        description: "Connect with alumni and professionals for career opportunities!",
        date: "2025-05-18",
        location: "Bent Hall",
        link: "career_night.html",
        category: ["Academic", "Social Activities"]
    },
    {
        title: "Movie Night Under the Stars",
        description: "Enjoy a movie screening with snacks and friends!",
        date: "2025-05-20",
        location: "Great Lawn",
        link: "movie_night.html",
        category: ["Social Activities", "Community"]
    },
    {
        title: "E-Sports Tournament",
        description: "Compete in popular games for prizes and bragging rights!",
        date: "2025-05-22",
        location: "Student Center",
        link: "esports_tournament.html",
        category: ["Tech", "Sports"]
    },
    {
        title: "Meditation & Wellness Workshop",
        description: "Learn mindfulness techniques to reduce stress and improve focus!",
        date: "2025-05-25",
        location: "Wellness Center",
        link: "meditation_workshop.html",
        category: ["Community", "Academic"]
    }
];



// Function to render the calendar
function renderCalendar(month, year) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    document.getElementById("monthYear").textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const weekDaysRow = document.createElement("div");
    weekDaysRow.classList.add("calendar-weekdays");
    weekDaysRow.innerHTML = calendarDays.map(day => `<div>${day}</div>`).join("");
    calendar.appendChild(weekDaysRow);

    const gridContainer = document.createElement("div");
    gridContainer.classList.add("calendar-grid");

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-cell", "empty");
        gridContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("calendar-cell");
        dateCell.textContent = day;

        const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        // Check for events on this date
        const eventsForDate = eventsData.filter(event => event.date === formattedDate);
        if (eventsForDate.length > 0) {
            dateCell.classList.add("has-event");
            dateCell.onclick = () => displayEvents(eventsForDate);
        }

        gridContainer.appendChild(dateCell);
    }

    calendar.appendChild(gridContainer);
}

function displayClubMeetings(clubs) {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = ""; // Clear previous events

    if (clubs.length === 0) {
        eventsContainer.innerHTML = "<p>No club meetings scheduled for this date.</p>";
        return;
    }

    clubs.forEach(club => {
        const clubCard = document.createElement("div");
        clubCard.classList.add("event-card");

        clubCard.innerHTML = `
            <div class="content">
                <h3>${club.name}</h3>
                <p><strong>Time:</strong> ${club.time}</p>
                <p><strong>Location:</strong> ${club.location}</p>
            </div>
        `;

        eventsContainer.appendChild(clubCard);
    });
}

// Function to navigate between months
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

// Function to display events when a date is clicked
function displayEvents(events) {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = ""; // Clear previous events

    if (events.length === 0) {
        eventsContainer.innerHTML = "<p>No events for this date.</p>";
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
            <a href="${event.link}" class="event-link">
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