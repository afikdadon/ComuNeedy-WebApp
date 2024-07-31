document.addEventListener('DOMContentLoaded', function() {
    // Ensure the `request` object is properly assigned
    if (typeof request === 'undefined' || !request) {
        console.error('Request details not provided');
        document.querySelector('.container').innerHTML = '<p>Error loading request details</p>';
        return;
    }

    // Update the request details in the HTML
    document.getElementById('requestTitle').innerText = `#${request.requestID} ${request.typeOfService}`;
    document.getElementById('requestType').innerText = request.typeOfService;
    document.getElementById('requestDescription').innerText = request.serviceDescription || '';
    document.getElementById('requestStatus').innerText = request.status;
    document.getElementById('applicationDate').innerText = request.openDate;
    document.getElementById('volunteerAssigned').innerText = request.selectedVolunteer;
    document.getElementById('completionDate').innerText = request.status === 'completed' ? request.completionDate : '-';

    // Handle the display of the Write Review button
    const writeReviewButton = document.getElementById('writeReviewButton');
    console.log(request.status);
    if (request.status === 'Completed') {
        writeReviewButton.style.display = 'block';
        writeReviewButton.addEventListener('click', function() {
            const volunteerID = request.selectedVolunteer;
            const requestId = request.requestID;
            // const requestDetails = JSON.stringify(request);
           const url = `/service_feedback?volunteer=${encodeURIComponent(volunteerID)}&request_id=${encodeURIComponent(requestId)}`;
            console.log('Redirecting to:', url);
            window.location.href = url;
        });
    } else {
        writeReviewButton.style.display = 'none';
    }
});