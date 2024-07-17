document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const requestId = queryParams.get('id');
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

    if (!requestId) {
        console.error('Request ID not provided in URL');
        return;
    }

    const requestDetails = requestStatuses.find(request => request.id === requestId);

    if (requestDetails) {
        document.getElementById('requestTitle').innerText = `#${requestDetails.id} ${requestDetails.title}`;
        document.getElementById('requestType').innerText = requestDetails.type;
        document.getElementById('requestDescription').innerText = requestDetails.description || '';
        document.getElementById('requestStatus').innerText = requestDetails.status;
        document.getElementById('applicationDate').innerText = requestDetails.date;
        document.getElementById('applicantName').innerText = requestDetails.requester;
        document.getElementById('contactEmail').innerText = requestDetails.contactEmail || '';
        document.getElementById('contactPhone').innerText = requestDetails.contactPhone || '';
        document.getElementById('volunteerAssigned').innerText = requestDetails.volunteer;
        document.getElementById('completionDate').innerText = requestDetails.status === 'completed' ? requestDetails.completionDate : '-';

        const writeReviewButton = document.getElementById('writeReviewButton');

        if (requestDetails.status === 'completed') {
            writeReviewButton.style.display = 'block';
            writeReviewButton.addEventListener('click', function() {
                const volunteerName =requestDetails.volunteer;
                const request_id = requestDetails.id;
            window.location.href = '/service_request?volunteer=' + encodeURIComponent(volunteerName) + '&request_id=' + encodeURIComponent(request_id);
            });
        } else {
            writeReviewButton.style.display = 'none';
        }
    } else {
        document.querySelector('.container').innerHTML = '<p>Request not found</p>';
    }
});