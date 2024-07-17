// Mock data for volunteers
const volunteers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        dateOfBirth: '1985-01-15',
        age: calculateAge('1985-01-15'),
        languages: ['English'],
        typeOfService: 'Education',
        serviceArea: 'North',
        averageRating: 4.5,
        reviews: [
            {
                review: 'John is very dedicated and helpful.',
                serviceProvided: 'Tutoring',
                starRating: 5
            },
            {
                review: 'Great teaching skills.',
                serviceProvided: 'Mentoring',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'Female',
        dateOfBirth: '1990-06-22',
        age: calculateAge('1990-06-22'),
        languages: ['Spanish'],
        typeOfService: 'Healthcare',
        serviceArea: 'South',
        averageRating: 4.3,
        reviews: [
            {
                review: 'Jane is very professional and caring.',
                serviceProvided: 'Nursing',
                starRating: 4
            },
            {
                review: 'Excellent patient care.',
                serviceProvided: 'Medical Assistance',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Michael',
        lastName: 'Johnson',
        gender: 'Male',
        dateOfBirth: '1982-03-10',
        age: calculateAge('1982-03-10'),
        languages: ['French'],
        typeOfService: 'Community Service',
        serviceArea: 'Center',
        averageRating: 5.0,
        reviews: [
            {
                review: 'Michael goes above and beyond.',
                serviceProvided: 'Community Cleanup',
                starRating: 5
            },
            {
                review: 'Very reliable and hardworking.',
                serviceProvided: 'Event Organization',
                starRating: 5
            }
        ]
    },
    {
        firstName: 'Emily',
        lastName: 'Brown',
        gender: 'Female',
        dateOfBirth: '1995-12-05',
        age: calculateAge('1995-12-05'),
        languages: ['English'],
        typeOfService: 'Healthcare',
        serviceArea: 'Jerusalem',
        averageRating: 3.5,
        reviews: [
            {
                review: 'Emily is very compassionate.',
                serviceProvided: 'Counseling',
                starRating: 3
            },
            {
                review: 'Great listener and advisor.',
                serviceProvided: 'Therapy Sessions',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        gender: 'Male',
        dateOfBirth: '1988-08-20',
        age: calculateAge('1988-08-20'),
        languages: ['Spanish'],
        typeOfService: 'Education',
        serviceArea: 'Eilat',
        averageRating: 4.0,
        reviews: [
            {
                review: 'Carlos is an excellent teacher.',
                serviceProvided: 'Tutoring',
                starRating: 4
            },
            {
                review: 'Very patient and knowledgeable.',
                serviceProvided: 'Language Teaching',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Sophie',
        lastName: 'Martin',
        gender: 'Female',
        dateOfBirth: '1986-11-18',
        age: calculateAge('1986-11-18'),
        languages: ['French'],
        typeOfService: 'Community Service',
        serviceArea: 'North',
        averageRating: 4.5,
        reviews: [
            {
                review: 'Sophie is very organized.',
                serviceProvided: 'Event Planning',
                starRating: 5
            },
            {
                review: 'Great leadership skills.',
                serviceProvided: 'Community Outreach',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'David',
        lastName: 'Lee',
        gender: 'Male',
        dateOfBirth: '1992-07-30',
        age: calculateAge('1992-07-30'),
        languages: ['English'],
        typeOfService: 'Education',
        serviceArea: 'Center',
        averageRating: 3.5,
        reviews: [
            {
                review: 'David is a great educator.',
                serviceProvided: 'Teaching',
                starRating: 3
            },
            {
                review: 'Very inspiring and motivational.',
                serviceProvided: 'Student Mentoring',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Maria',
        lastName: 'Garcia',
        gender: 'Female',
        dateOfBirth: '1989-04-15',
        age: calculateAge('1989-04-15'),
        languages: ['Spanish'],
        typeOfService: 'Healthcare',
        serviceArea: 'South',
        averageRating: 5.0,
        reviews: [
            {
                review: 'Maria is very attentive.',
                serviceProvided: 'Patient Care',
                starRating: 5
            },
            {
                review: 'Exceptional service.',
                serviceProvided: 'Medical Assistance',
                starRating: 5
            }
        ]
    },
    {
        firstName: 'Ahmed',
        lastName: 'Hassan',
        gender: 'Male',
        dateOfBirth: '1985-09-25',
        age: calculateAge('1985-09-25'),
        languages: ['Arabic'],
        typeOfService: 'Community Service',
        serviceArea: 'Jerusalem',
        averageRating: 4.0,
        reviews: [
            {
                review: 'Ahmed is very helpful.',
                serviceProvided: 'Community Support',
                starRating: 4
            },
            {
                review: 'Always willing to help.',
                serviceProvided: 'Event Coordination',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Leah',
        lastName: 'Cohen',
        gender: 'Female',
        dateOfBirth: '1994-02-28',
        age: calculateAge('1994-02-28'),
        languages: ['Hebrew'],
        typeOfService: 'Education',
        serviceArea: 'North',
        averageRating: 4.5,
        reviews: [
            {
                review: 'Leah is an amazing teacher.',
                serviceProvided: 'Tutoring',
                starRating: 4
            },
            {
                review: 'Very engaging and interactive.',
                serviceProvided: 'Classroom Teaching',
                starRating: 5
            }
        ]
    },
    {
        firstName: 'Anna',
        lastName: 'Ivanova',
        gender: 'Female',
        dateOfBirth: '1987-12-10',
        age: calculateAge('1987-12-10'),
        languages: ['Ukrainian'],
        typeOfService: 'Healthcare',
        serviceArea: 'Eilat',
        averageRating: 4.0,
        reviews: [
            {
                review: 'Anna is very compassionate.',
                serviceProvided: 'Counseling',
                starRating: 4
            },
            {
                review: 'Great advisor.',
                serviceProvided: 'Therapy Sessions',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Amanuel',
        lastName: 'Tesfaye',
        gender: 'Male',
        dateOfBirth: '1991-05-14',
        age: calculateAge('1991-05-14'),
        languages: ['Amharic'],
        typeOfService: 'Community Service',
        serviceArea: 'Center',
        averageRating: 4.5,
        reviews: [
            {
                review: 'Amanuel is very dedicated.',
                serviceProvided: 'Community Cleanup',
                starRating: 5
            },
            {
                review: 'Hardworking and reliable.',
                serviceProvided: 'Event Organization',
                starRating: 4
            }
        ]
    },
    {
        firstName: 'Fatima',
        lastName: 'Al-Mahdi',
        gender: 'Female',
        dateOfBirth: '1986-03-02',
        age: calculateAge('1986-03-02'),
        languages: ['Arabic'],
        typeOfService: 'Education',
        serviceArea: 'Jerusalem',
        averageRating: 4.5,
        reviews: [
            {
                review: 'Fatima is very knowledgeable.',
                serviceProvided: 'Tutoring',
                starRating: 4
            },
            {
                review: 'Patient and understanding.',
                serviceProvided: 'Language Teaching',
                starRating: 5
            }
        ]
    }
];


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
    return [...new Set(array.map(item => item[key]))].sort();
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

        volunteerItem.innerHTML = `
            <div>${volunteer.firstName} ${volunteer.lastName}</div>
            <div>${volunteer.languages.join(', ')}</div>
            <div>${volunteer.serviceArea}</div>
            <div>${volunteer.averageRating} stars</div>
            <div><a href="#" class="details-button" onclick="showVolunteerDetails(${JSON.stringify(volunteer).replace(/"/g, '&quot;')})">More Details</a></div>
        `;

        volunteerList.appendChild(volunteerItem);
    });
}


// Function to show volunteer details and store in sessionStorage
function showVolunteerDetails(volunteer) {
    sessionStorage.setItem('selectedVolunteer', JSON.stringify(volunteer));
    window.location.href = 'volunteer_profile'; // Redirect to profile page
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
populateFilterOptions();
renderVolunteers();
