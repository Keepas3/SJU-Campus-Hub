// academics.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studyGroupForm');
    const confirmation = document.getElementById('confirmationMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.style.display = 'none';
        confirmation.style.display = 'block';
    });
});
