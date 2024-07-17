document.addEventListener('DOMContentLoaded', function() {
    const serviceTypeSelect = document.getElementById('service-type');
    const volunteerSelect = document.getElementById('volunteer');
    const serviceAreaSelect = document.getElementById('serviceArea');
    const availableDatesStartInput = document.getElementById('available-dates-start');
    const availableDatesEndInput = document.getElementById('available-dates-end');
    const submitButton = document.getElementById('submit-button');

    // Event listener for start date change
    availableDatesStartInput.addEventListener('change', function() {
        validateDateRange();
    });

    // Event listener for end date change
    availableDatesEndInput.addEventListener('change', function() {
        validateDateRange();
    });

    function validateDateRange() {
        const startDate = new Date(availableDatesStartInput.value);
        const endDate = new Date(availableDatesEndInput.value);
        const today = new Date(); // Current date

        // Check if start date is before today
        if (startDate < today) {
            alert('Start date cannot be earlier than today.');
            availableDatesStartInput.value = ''; // Clear the input field
            return;
        }

        // Check if end date is before start date
        if (endDate < startDate) {
            alert('End date cannot precede start date.');
            availableDatesEndInput.value = ''; // Clear the input field
            return;
        }
    }
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


    const serviceAreas = new Set();

    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function populateServiceTypes() {
        const serviceTypes = new Set();
        volunteers.forEach(volunteer => serviceTypes.add(volunteer.typeOfService));

        serviceTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            serviceTypeSelect.appendChild(option);
        });
    }

    function populateServiceAreas() {
        volunteers.forEach(volunteer => serviceAreas.add(volunteer.serviceArea));

        serviceAreas.forEach(serviceArea => {
            const option = document.createElement('option');
            option.value = serviceArea;
            option.textContent = serviceArea;
            serviceAreaSelect.appendChild(option);
        });
    }

    function populateVolunteers(serviceType) {
        volunteerSelect.innerHTML = '<option value="">No preference (optional)</option>';
        volunteerSelect.disabled = true;

        if (serviceType) {
            const filteredVolunteers = volunteers.filter(volunteer => volunteer.typeOfService === serviceType);
            filteredVolunteers.forEach(volunteer => {
                const option = document.createElement('option');
                option.value = `${volunteer.firstName} ${volunteer.lastName}`;
                option.textContent = `${volunteer.firstName} ${volunteer.lastName}`;
                volunteerSelect.appendChild(option);
            });

            volunteerSelect.disabled = false;
        }
    }

    volunteerSelect.disabled = true;

    serviceTypeSelect.addEventListener('change', function() {
        const selectedServiceType = serviceTypeSelect.value;

        if (selectedServiceType) {
            populateVolunteers(selectedServiceType);
        } else {
            volunteerSelect.innerHTML = '<option value="">No preference (optional)</option>';
            volunteerSelect.disabled = true;
        }
    });

    const newRequestForm = document.getElementById('newRequestForm');

    newRequestForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const serviceArea = serviceAreaSelect.value.trim();
        const email = document.getElementById('email').value.trim();
        const serviceType = serviceTypeSelect.value.trim();
        const serviceDescription = document.getElementById('service-description').value.trim();
        const availableDatesStart = availableDatesStartInput.value.trim();
        const availableDatesEnd = availableDatesEndInput.value.trim();
        const volunteer = volunteerSelect.value.trim();

        if (!validateFormData(firstName, lastName, serviceArea, email, serviceType, serviceDescription, availableDatesStart, availableDatesEnd)) {
            return;
        }

        console.log('Form submitted successfully:', { firstName, lastName, serviceArea, email, serviceType, serviceDescription, availableDatesStart, availableDatesEnd, volunteer });

        alert('Request submitted successfully!\nThank you for using ComuNeedy.');

        setTimeout(function() {
            window.location.href = '/requests';
        }, 2000);
    });

    function validateFormData(firstName, lastName, serviceArea, email, serviceType, serviceDescription, availableDatesStart, availableDatesEnd) {
        const nameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (firstName === '' || lastName === '' || serviceArea === '' || email === '' || serviceType === '' || serviceDescription === '' || availableDatesStart === '' || availableDatesEnd === '') {
            alert('Please fill in all fields.');
            return false;
        }

        if (!nameRegex.test(firstName)) {
            alert('Please enter a valid first name (letters only).');
            return false;
        }

        if (!nameRegex.test(lastName)) {
            alert('Please enter a valid last name (letters only).');
            return false;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        const today = new Date();
        const startDate = new Date(availableDatesStart);
        const endDate = new Date(availableDatesEnd);

        if (startDate < today || endDate < startDate) {
            alert('Please select valid dates.');
            return false;
        }

        return true;
    }

    populateServiceTypes();
    populateServiceAreas();
});