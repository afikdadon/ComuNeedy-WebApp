document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const volunteerName = queryParams.get('volunteer');
    const requestId = queryParams.get('requestId');

    // Update the volunteer name and request ID in the HTML
    document.getElementById('volunteer-name').textContent = volunteerName;
    document.getElementById('serviceFeedbackHeading').textContent = `Service Feedback #${requestId}`;

    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('rating');
    const feedbackForm = document.getElementById('feedbackForm');

    stars.forEach(star => {
        star.addEventListener('mouseover', handleMouseOver);
        star.addEventListener('mouseout', handleMouseOut);
        star.addEventListener('click', handleClick);
    });

    function handleMouseOver(e) {
        const rating = parseInt(e.target.getAttribute('data-rating'));
        highlightStars(rating);
    }

    function handleMouseOut() {
        const selectedRating = parseInt(ratingInput.value);
        highlightStars(selectedRating);
    }

    function handleClick(e) {
        const rating = parseInt(e.target.getAttribute('data-rating'));
        ratingInput.value = rating;
        highlightStars(rating);
    }

    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const description = document.getElementById('description').value.trim();

        if (!ratingInput.value) {
            alert('Please rate the service by the stars.');
            return;
        }

        if (name === '' || email === '' || description === '') {
            alert('Please fill out all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Form submission successful
        console.log('Form submitted successfully:', { volunteerName, name, email, description });

        // Display message to the user
        alert('Review accepted!\nThank you very much and hope to be of help in other requests');

        setTimeout(function() {
            window.location.href = 'Home Page.html';
        }, 500); // 0.5 seconds delay
    });

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
