function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-menu');
    const avatar = document.getElementById('profile-avatar');
    if (dropdown.style.display === 'flex' && !avatar.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});
