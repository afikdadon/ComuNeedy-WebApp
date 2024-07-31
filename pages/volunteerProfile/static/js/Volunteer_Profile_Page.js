document.addEventListener('DOMContentLoaded', function() {
    var selectedVolunteer = JSON.parse(sessionStorage.getItem('selectedVolunteer'));
    console.log("Selected Volunteer Data:", selectedVolunteer);

    if (selectedVolunteer) {
        // Update personal details
        document.getElementById('firstName').textContent = selectedVolunteer.firstName || 'N/A';
        document.getElementById('lastName').textContent = selectedVolunteer.lastName || 'N/A';
        document.getElementById('gender').textContent = selectedVolunteer.gender || 'Not specified';
        document.getElementById('dob').textContent = selectedVolunteer.birthDate || 'Not available';
        document.getElementById('age').textContent = selectedVolunteer.birthDate ? calculateAge(selectedVolunteer.birthDate) : 'N/A';
        document.getElementById('languages').textContent = Array.isArray(selectedVolunteer.languages) ? selectedVolunteer.languages.join(', ') : (selectedVolunteer.languages || 'Not specified');

        // Update service details
        document.getElementById('serviceType').textContent = selectedVolunteer.typeOfService || 'Not specified';
        document.getElementById('serviceArea').textContent = selectedVolunteer.serviceArea || 'Not specified';

        // Display average rating
        displayAverageRating(selectedVolunteer.averageRating, selectedVolunteer.totalReviews);

        // Fetch and display individual reviews
        fetchReviews(selectedVolunteer.volunteerID);
    } else {
        console.error('Selected volunteer data not found.');
    }
});

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

function displayAverageRating(averageRating, totalReviews) {
    var averageRatingValue = document.getElementById('averageRatingValue');
    var averageStarRating = document.getElementById('averageStarRating');
    var totalReviewsElement = document.getElementById('totalReviews');

    if (averageRating !== undefined) {
        averageRatingValue.textContent = parseFloat(averageRating).toFixed(1);
        averageStarRating.innerHTML = getStarRating(Math.round(averageRating));
    } else {
        averageRatingValue.textContent = 'N/A';
        averageStarRating.innerHTML = '';
    }

    totalReviewsElement.textContent = totalReviews !== undefined ? `(${totalReviews} reviews)` : '(No reviews yet)';
}

function getStarRating(rating) {
    const fullStar = '<span class="star full">★</span>';
    const emptyStar = '<span class="star empty">☆</span>';
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

function fetchReviews(volunteerID) {
    fetch(`/api/reviews/${volunteerID}`)
        .then(response => response.json())
        .then(reviews => {
            displayReviews(reviews);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            document.getElementById('reviewsList').textContent = 'Error loading reviews.';
        });
}

function displayReviews(reviews) {
    var reviewsContainer = document.getElementById('reviewsList');
    reviewsContainer.innerHTML = '';

    if (!reviews || reviews.length === 0) {
        reviewsContainer.textContent = 'No individual reviews available.';
        return;
    }

    reviews.forEach(function(review, index) {
        var reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');

        // Add star rating
        var starsDiv = document.createElement('div');
        starsDiv.classList.add('star-rating');
        starsDiv.innerHTML = getStarRating(review.rating);
        reviewDiv.appendChild(starsDiv);

        // Add review text
        var reviewText = document.createElement('p');
        reviewText.textContent = review.description || 'No description provided.';
        reviewDiv.appendChild(reviewText);

        reviewsContainer.appendChild(reviewDiv);

        // Add separator if it's not the last review
        if (index < reviews.length - 1) {
            var separator = document.createElement('hr');
            reviewsContainer.appendChild(separator);
        }
    });
}