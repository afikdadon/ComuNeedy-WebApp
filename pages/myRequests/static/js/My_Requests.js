// My_Requests.js
document.addEventListener('DOMContentLoaded', function() {
    const requestContainer = document.getElementById('request-container');
    const filterSelect = document.getElementById('typeFilterSelect');
    const statusFilterSelect = document.getElementById('statusFilterSelect');
    const fromDateInput = document.getElementById('fromDateInput');
    const toDateInput = document.getElementById('toDateInput');
    const filterButton = document.getElementById('filterButton');
    const resetButton = document.getElementById('resetButton');
    const sortIcon = document.getElementById('sortIcon');

    flatpickr(fromDateInput, {
        dateFormat: "Y-m-d",
        allowInput: true,
        onChange: function(selectedDates, dateStr, instance) {
            toDatePicker.set('minDate', dateStr);
        }
    });

    const toDatePicker = flatpickr(toDateInput, {
        dateFormat: "Y-m-d",
        allowInput: true,
        onChange: function(selectedDates, dateStr, instance) {
            fromDatePicker.set('maxDate', dateStr);
        }
    });

    const populateFilterOptions = () => {
        // Clear existing options first
        filterSelect.innerHTML = '<option value="">-- Filter by Type --</option>';
        statusFilterSelect.innerHTML = '<option value="">-- Filter by Status --</option>';

        const types = [...new Set(requestStatuses.map(request => request.type.trim().toLowerCase()))];
        types.forEach(type => {
            const option = document.createElement('option');
            option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            option.value = type;
            filterSelect.appendChild(option);
        });

        const statuses = [...new Set(requestStatuses.map(request => request.status.trim().toLowerCase()))];
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            option.value = status;
            statusFilterSelect.appendChild(option);
        });
    };

    const renderRequests = (filteredRequests) => {
        requestContainer.innerHTML = '';
        if (filteredRequests.length === 0) {
            requestContainer.innerHTML = '<div class="no-requests">No requests found.</div>';
            return;
        }
        filteredRequests.forEach(request => {
            const requestItem = document.createElement('div');
            requestItem.classList.add('request-item');

            requestItem.innerHTML = `
                <div>${request.id}</div>
                <div>${request.type}</div>
                <div>${request.serviceArea}</div>
                <div>${request.openDate}</div>
                <div>${request.status.toLowerCase() === 'completed' ? request.completionDate : '-'}</div>
                <div>${request.title}</div>
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
            const openDate = new Date(request.openDate);
            const isTypeMatch = !typeFilter || request.type.toLowerCase() === typeFilter;
            const isStatusMatch = !statusFilter || request.status.toLowerCase() === statusFilter;
            const isFromDateMatch = !fromDate || openDate >= fromDate;
            const isToDateMatch = !toDate || openDate <= toDate;

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
    if (requestStatuses.length > 0) {
        populateFilterOptions();
        renderRequests(requestStatuses);
    } else {
        requestContainer.innerHTML = '<div class="no-requests">No requests found.</div>';
    }

    filterButton.addEventListener('click', filterRequests);
    resetButton.addEventListener('click', resetFilters);

    // Sorting logic
    let sortAscending = true; // Default sorting order
    sortIcon.addEventListener('click', () => {
        requestStatuses.sort((a, b) => {
            if (sortAscending) {
                return new Date(a.openDate) - new Date(b.openDate);
            } else {
                return new Date(b.openDate) - new Date(a.openDate);
            }
        });
        sortAscending = !sortAscending;
        renderRequests(requestStatuses);
    });
});