// Function to calculate age from birthdate
function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to get unique values from the volunteer data
function getUniqueValues(array, key) {
    return [...new Set(array.map(item => item[key]).flat())].sort();
}

// Function to populate filter options dynamically
function populateFilterOptions() {
    const languageFilter = document.getElementById('languageFilter');
    const areaFilter = document.getElementById('areaFilter');

    const uniqueLanguages = getUniqueValues(volunteers, 'languages');
    const uniqueAreas = getUniqueValues(volunteers, 'serviceArea');

    uniqueLanguages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });

    uniqueAreas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaFilter.appendChild(option);
    });
}

// Function to render volunteers based on filters and sorting
function renderVolunteers() {
    const languageFilter = document.getElementById('languageFilter').value;
    const areaFilter = document.getElementById('areaFilter').value;
    const sortBy = document.getElementById('sortFilter').value;

    const filteredVolunteers = volunteers.filter(volunteer =>
        (languageFilter === '' || volunteer.languages.includes(languageFilter)) &&
        (areaFilter === '' || volunteer.serviceArea === areaFilter)
    );

    const sortedVolunteers = sortVolunteersData(filteredVolunteers, sortBy);

    const volunteerList = document.getElementById('volunteerList');
    volunteerList.innerHTML = '';

    sortedVolunteers.forEach((volunteer) => {
        const volunteerItem = document.createElement('div');
        volunteerItem.classList.add('volunteer-item');

        // Format the average rating, handling undefined values
        const formattedRating = volunteer.averageRating !== undefined ?
            `${volunteer.averageRating.toFixed(2)} stars` :
            'Not rated';

        volunteerItem.innerHTML = `
            <div>${volunteer.firstName} ${volunteer.lastName}</div>
            <div>${Array.isArray(volunteer.languages) ? volunteer.languages.join(', ') : volunteer.languages}</div>
            <div>${volunteer.serviceArea}</div>
            <div>${formattedRating}</div>
            <div><a href="#" class="details-button" onclick="showVolunteerDetails(${JSON.stringify(volunteer).replace(/"/g, '&quot;')})">More Details</a></div>
        `;

        volunteerList.appendChild(volunteerItem);
    });
}

// Function to show volunteer details and store in sessionStorage
function showVolunteerDetails(volunteer) {
    sessionStorage.setItem('selectedVolunteer', JSON.stringify(volunteer));
    window.location.href = '/volunteer_profile'; // Redirect to profile page
}

// Function to sort volunteers based on the selected criteria
function sortVolunteersData(volunteersData, sortBy) {
    let sortedVolunteers = [...volunteersData];

    switch (sortBy) {
        case 'alphabetical':
            sortedVolunteers.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
            break;
        case 'rating-desc':
            sortedVolunteers.sort((a, b) => b.averageRating - a.averageRating);
            break;
        case 'rating-asc':
            sortedVolunteers.sort((a, b) => a.averageRating - b.averageRating);
            break;
        default:
            break;
    }

    return sortedVolunteers;
}

// Event listeners for filters and sorting
document.getElementById('languageFilter').addEventListener('change', renderVolunteers);
document.getElementById('areaFilter').addEventListener('change', renderVolunteers);
document.getElementById('sortFilter').addEventListener('change', renderVolunteers);

// Initial population of filter options and rendering of volunteers
document.addEventListener('DOMContentLoaded', function() {
    populateFilterOptions();
    renderVolunteers();
});