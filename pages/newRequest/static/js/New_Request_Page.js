document.addEventListener('DOMContentLoaded', function() {
    const serviceTypeSelect = document.getElementById('service-type');
    const serviceAreaSelect = document.getElementById('serviceArea');
    const availableDatesStartInput = document.getElementById('available-dates-start');
    const availableDatesEndInput = document.getElementById('available-dates-end');

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
        const today = new Date();

        if (startDate < today) {
            alert('Start date cannot be earlier than today.');
            availableDatesStartInput.value = '';
            return;
        }

        if (endDate < startDate) {
            alert('End date cannot precede start date.');
            availableDatesEndInput.value = '';
            return;
        }
    }

    // Fetch service types and areas from the server
    fetch('/get-service-data')
        .then(response => response.json())
        .then(data => {
            populateServiceTypes(data.serviceTypes);
            populateServiceAreas(data.serviceAreas);
            // We're not using statuses on this page, but it's available if needed
        })
        .catch(error => console.error('Error:', error));

    function populateServiceTypes(serviceTypes) {
        serviceTypeSelect.innerHTML = '<option value="">Select service type</option>';
        serviceTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            serviceTypeSelect.appendChild(option);
        });
    }

    function populateServiceAreas(serviceAreas) {
        serviceAreaSelect.innerHTML = '<option value="">Select service area</option>';
        serviceAreas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            serviceAreaSelect.appendChild(option);
        });
    }

    const newRequestForm = document.getElementById('newRequestForm');

    newRequestForm.addEventListener('submit', function(event) {
        if (!validateFormData()) {
            event.preventDefault();
        }
    });

    function validateFormData() {
        const serviceArea = serviceAreaSelect.value.trim();
        const serviceType = serviceTypeSelect.value.trim();
        const serviceDescription = document.getElementById('service-description').value.trim();
        const availableDatesStart = availableDatesStartInput.value.trim();
        const availableDatesEnd = availableDatesEndInput.value.trim();

        if (serviceArea === '' || serviceType === '' || serviceDescription === '' || availableDatesStart === '' || availableDatesEnd === '') {
            alert('Please fill in all fields.');
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
});