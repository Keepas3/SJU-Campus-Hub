const eventsData = [
    {
        title: "Coding Bootcamp",
        description: "Join us for a full-day coding bootcamp!",
        date: "2025-04-28",
        image: "https://via.placeholder.com/400x200?text=Coding+Bootcamp",
    },
    {
        title: "Art Workshop",
        description: "A creative art workshop to express yourself.",
        date: "2025-04-28",
        image: "https://via.placeholder.com/400x200?text=Art+Workshop",
    },
    {
        title: "Campus Yoga",
        description: "A relaxing yoga session to rejuvenate your mind.",
        date: "2025-04-29",
        image: "https://via.placeholder.com/400x200?text=Yoga+Session",
    },
    {
        title: "Cooking Class",
        description: "Learn how to cook delicious and healthy meals.",
        date: "2025-04-30",
        image: "https://via.placeholder.com/400x200?text=Cooking+Class",
    },
];

const calendarDays = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

let selectedDate = null;

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
    displayEvents();
});

function renderCalendar() {
    const calendar = document.getElementById("calendar");

    // Assume April 2025, starting on a Monday (for simplicity)
    const firstDayOfMonth = new Date(2025, 3, 1);
    const totalDaysInMonth = new Date(2025, 3 + 1, 0).getDate();
    
    // Render calendar header with day names
    const header = calendar.querySelector(".calendar-header");
    calendar.innerHTML = `
        <div class="calendar-header">
            ${calendarDays.map(day => `<div>${day}</div>`).join("")}
        </div>
    `;

    // Render calendar days
    for (let i = 1; i <= totalDaysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("calendar-day");
        day.textContent = i;
        day.onclick = () => handleDayClick(i);
        calendar.appendChild(day);
    }
}

function handleDayClick(day) {
    selectedDate = `2025-04-${String(day).padStart(2, "0")}`;
    displayEvents();
}

function displayEvents() {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = "";

    const filteredEvents = eventsData.filter(event => event.date === selectedDate);
    
    if (filteredEvents.length > 0) {
        filteredEvents.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p class="date">${event.date}</p>
            `;
            eventsContainer.appendChild(eventCard);
        });
    } else {
        eventsContainer.innerHTML = "<p>No events for this day.</p>";
    }
}

function searchEvents() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredEvents = eventsData.filter(event => 
        event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query)
    );
    
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = "";

    if (filteredEvents.length > 0) {
        filteredEvents.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p class="date">${event.date}</p>
            `;
            eventsContainer.appendChild(eventCard);
        });
    } else {
        eventsContainer.innerHTML = "<p>No events found.</p>";
    }
}
