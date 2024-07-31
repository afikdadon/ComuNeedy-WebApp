document.addEventListener('DOMContentLoaded', function() {
    const starRating = document.getElementById('starRating');
    const ratingInput = document.getElementById('ratingInput');
    const feedbackForm = document.getElementById('feedbackForm');

    // Handle star rating
    starRating.addEventListener('click', function(e) {
        if (e.target.classList.contains('star')) {
            const rating = e.target.dataset.rating;
            ratingInput.value = rating;
            updateStars(rating);
        }
    });

    function updateStars(rating) {
        const stars = starRating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    // Handle form submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = ratingInput.value;
        const description = document.getElementById('description').value;
        const requestId = document.getElementById('requestId').value;

        console.log('Submitting feedback:', { rating, description, requestId });

        fetch('/submit_feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: rating,
                description: description,
                requestId: requestId
            }),
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.success) {
                alert('Feedback submitted successfully!');
                window.location.href = '/';  // Redirect to the home page
            } else {
                alert('Error submitting feedback: ' + (data.message || 'Unknown error'));
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            alert('An error occurred. Please check the console and try again.');
        });
    });
});