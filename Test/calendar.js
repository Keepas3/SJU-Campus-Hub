const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar(currentMonth, currentYear);
});

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
        dateCell.onclick = () => handleDayClick(year, month, day);
        gridContainer.appendChild(dateCell);
    }

    calendar.appendChild(gridContainer);
}

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

function handleDayClick(year, month, day) {
    selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    alert(`Selected date: ${selectedDate}`);
}