document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected volunteer data from sessionStorage
    var selectedVolunteer = JSON.parse(sessionStorage.getItem('selectedVolunteer'));

    if (selectedVolunteer) {
        // Update personal details
        document.getElementById('firstName').textContent = selectedVolunteer.firstName;
        document.getElementById('lastName').textContent = selectedVolunteer.lastName;
        document.getElementById('gender').textContent = selectedVolunteer.gender;
        document.getElementById('dob').textContent = selectedVolunteer.dateOfBirth;
        document.getElementById('age').textContent = calculateAge(selectedVolunteer.dateOfBirth);
        document.getElementById('languages').textContent = selectedVolunteer.languages.join(', ');

        // Update service details
        document.getElementById('serviceType').textContent = selectedVolunteer.typeOfService;
        document.getElementById('serviceArea').textContent = selectedVolunteer.serviceArea;

        // Display average rating and reviews
        displayAverageRating(selectedVolunteer.averageRating);
        displayReviews(selectedVolunteer.reviews);
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

function displayAverageRating(averageRating) {
    var averageRatingValue = document.getElementById('averageRatingValue');
    var averageStarRating = document.getElementById('averageStarRating');

    // Update average rating value
    averageRatingValue.textContent = averageRating.toFixed(1);

    // Generate star icons for average rating
    generateStars(averageStarRating, averageRating);
}

function displayReviews(reviews) {
    var reviewsContainer = document.getElementById('reviewsList');
    var totalReviews = document.getElementById('totalReviews');

    // Update total reviews count
    totalReviews.textContent = `(${reviews.length} reviews)`;

    // Iterate through each review and display them
    reviews.forEach(function(review) {
        var reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');

        // 1. Display star rating
        var starsDiv = document.createElement('div');
        starsDiv.classList.add('review-stars');
        var starRating = document.createElement('div');
        starRating.classList.add('star-ratings-css');
        var starRatingTop = document.createElement('div');
        starRatingTop.classList.add('star-ratings-css-top');
        starRatingTop.style.width = (review.rating * 20) + '%';
        starRating.appendChild(starRatingTop);
        starsDiv.appendChild(starRating);
        reviewDiv.appendChild(starsDiv);

        // 2. Display review content
        var reviewContentDiv = document.createElement('div');
        reviewContentDiv.classList.add('review-content');
        var reviewDate = document.createElement('p');
        reviewDate.classList.add('review-date');
        reviewDate.textContent = formatDate(review.date);
        var reviewText = document.createElement('p');
        reviewText.classList.add('review-text');
        reviewText.textContent = review.text;
        reviewContentDiv.appendChild(reviewDate);
        reviewContentDiv.appendChild(reviewText);
        reviewDiv.appendChild(reviewContentDiv);

        reviewsContainer.appendChild(reviewDiv);
    });
}

function generateStars(parentElement, rating) {
    const numStars = 5;
    const starPercentage = (rating / numStars) * 100;
    const roundedStarPercentage = `${Math.round(starPercentage / 10) * 10}%`;
    parentElement.style.width = roundedStarPercentage;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
