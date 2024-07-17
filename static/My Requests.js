document.addEventListener('DOMContentLoaded', function() {
    const requestContainer = document.getElementById('request-container');
    const filterSelect = document.getElementById('typeFilterSelect');
    const statusFilterSelect = document.getElementById('statusFilterSelect');
    const fromDateInput = document.getElementById('fromDateInput');
    const toDateInput = document.getElementById('toDateInput');
    const filterButton = document.getElementById('filterButton');
    const resetButton = document.getElementById('resetButton');
    const sortIcon = document.getElementById('sortIcon');

    const requestStatuses = [
        { id: '78', status: 'completed', title: 'Food Donation', requester: 'Ilan Shtilman', type: 'Food', date: '2024-05-01', volunteer: 'Jane Smith' },
        { id: '90', status: 'pending', title: 'Medicine Delivery', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-05-15', volunteer: 'Yosef Levi' },
        { id: '91', status: 'completed', title: 'Language Tutoring', requester: 'Ilan Shtilman', type: 'Education', date: '2024-05-20', volunteer: 'John Doe' },
        { id: '92', status: 'in-progress', title: 'Medical Consultation', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-06-02', volunteer: 'Anna Ivanova' },
        { id: '93', status: 'completed', title: 'Community Cleanup', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-06-10', volunteer: 'Ahmed Hassan' },
        { id: '94', status: 'pending', title: 'English Language Class', requester: 'Ilan Shtilman', type: 'Education', date: '2024-06-15', volunteer: 'David Lee' },
        { id: '95', status: 'completed', title: 'Health Awareness Campaign', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-06-20', volunteer: 'Sara Abebe' },
        { id: '96', status: 'completed', title: 'Food Drive', requester: 'Ilan Shtilman', type: 'Food', date: '2024-07-05', volunteer: 'Carlos Rodriguez' },
        { id: '97', status: 'completed', title: 'Community Gardening', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-07-12', volunteer: 'Sophie Martin' },
        { id: '98', status: 'completed', title: 'Mathematics Tutoring', requester: 'Ilan Shtilman', type: 'Education', date: '2024-07-18', volunteer: 'Leah Cohen' },
        { id: '99', status: 'completed', title: 'Medical Supplies Donation', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-07-25', volunteer: 'Maria Garcia' },
        { id: '100', status: 'completed', title: 'Neighborhood Watch', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-08-01', volunteer: 'Yosef Levi' },
        { id: '101', status: 'completed', title: 'Literacy Program', requester: 'Ilan Shtilman', type: 'Education', date: '2024-08-10', volunteer: 'Fatima Al-Mahdi' },
        { id: '102', status: 'completed', title: 'Health Screening Camp', requester: 'Ilan Shtilman', type: 'Healthcare', date: '2024-08-15', volunteer: 'Michael Johnson' },
        { id: '103', status: 'completed', title: 'Environmental Cleanup', requester: 'Ilan Shtilman', type: 'Community Service', date: '2024-08-22', volunteer: 'Amanuel Tesfaye' },
        { id: '104', status: 'completed', title: 'Language Exchange Program', requester: 'Ilan Shtilman', type: 'Education', date: '2024-09-05', volunteer: 'Olena Petrova' }
    ];

    const populateFilterOptions = () => {
        const types = [...new Set(requestStatuses.map(request => request.type))];
        types.forEach(type => {
            const option = document.createElement('option');
            option.textContent = type;
            option.value = type.toLowerCase();
            filterSelect.appendChild(option);
        });

        const statuses = [...new Set(requestStatuses.map(request => request.status))];
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            option.value = status.toLowerCase();
            statusFilterSelect.appendChild(option);
        });
    };

    const renderRequests = (filteredRequests) => {
        requestContainer.innerHTML = '';
        filteredRequests.forEach(request => {
            const requestItem = document.createElement('div');
            requestItem.classList.add('request-item');

            requestItem.innerHTML = `
                <div>${request.id}</div>
                <div>${request.title}</div>
                <div>${request.requester}</div>
                <div>${request.type}</div>
                <div>${request.date}</div>
                <div>${request.volunteer}</div>
                <div>${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</div>
                <div><a href="/request_details?id=${request.id}" class="details-link">Details</a></div>
            `;

            requestContainer.appendChild(requestItem);
        });
    };

    const filterRequests = () => {
        const typeFilter = filterSelect.value.toLowerCase();
        const statusFilter = statusFilterSelect.value.toLowerCase();
        const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
        const toDate = toDateInput.value ? new Date(toDateInput.value) : null;

        const filteredRequests = requestStatuses.filter(request => {
            const requestDate = new Date(request.date);
            const isTypeMatch = !typeFilter || request.type.toLowerCase() === typeFilter;
            const isStatusMatch = !statusFilter || request.status.toLowerCase() === statusFilter;
            const isFromDateMatch = !fromDate || requestDate >= fromDate;
            const isToDateMatch = !toDate || requestDate <= toDate;

            return isTypeMatch && isStatusMatch && isFromDateMatch && isToDateMatch;
        });

        renderRequests(filteredRequests);
    };

    const resetFilters = () => {
        filterSelect.value = '';
        statusFilterSelect.value = '';
        fromDateInput.value = '';
        toDateInput.value = '';
        renderRequests(requestStatuses);
    };

    // Initialize filters and render initial requests
    populateFilterOptions();
    renderRequests(requestStatuses);

    // Initialize date pickers
    flatpickr(fromDateInput, {
        dateFormat: 'Y-m-d',
        maxDate: 'today',
        onChange: function(selectedDates, dateStr) {
            toDateInput._flatpickr.set('minDate', dateStr);
            filterRequests();
        }
    });

    flatpickr(toDateInput, {
        dateFormat: 'Y-m-d',
        maxDate: 'today',
        onChange: function(selectedDates, dateStr) {
            fromDateInput._flatpickr.set('maxDate', dateStr);
            filterRequests();
        }
    });

    filterButton.addEventListener('click', filterRequests);
    resetButton.addEventListener('click', resetFilters);

    // Sorting logic
    let sortAscending = true; // Default sorting order
    sortIcon.addEventListener('click', () => {
        requestStatuses.sort((a, b) => {
            if (sortAscending) {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });
        sortAscending = !sortAscending;
        renderRequests(requestStatuses);
    });
});
