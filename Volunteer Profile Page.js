document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected volunteer data from sessionStorage
    var selectedVolunteer = JSON.parse(sessionStorage.getItem('selectedVolunteer'));

    if (selectedVolunteer) {
        // Update personal details
        document.getElementById('firstName').textContent = selectedVolunteer.firstName;
        document.getElementById('lastName').textContent = selectedVolunteer.lastName;
        document.getElementById('gender').textContent = selectedVolunteer.gender;
        document.getElementById('dob').textContent = selectedVolunteer.dateOfBirth;
        document.getElementById('age').textContent = selectedVolunteer.age;
        document.getElementById('languages').textContent = selectedVolunteer.languages.join(', ');

        // Update service details
        document.getElementById('serviceType').textContent = selectedVolunteer.typeOfService;
        document.getElementById('serviceArea').textContent = selectedVolunteer.serviceArea;

        // Debug: Log reviews data to console
        console.log(selectedVolunteer.reviews);

        // Display average rating and reviews
        displayAverageRating(selectedVolunteer.averageRating);
        displayReviews(selectedVolunteer.reviews);
    } else {
        console.error('Selected volunteer data not found.');
    }
});


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
        starRating.classList.add('star-ratings-css-bottom');
        generateStars(starRating, review.starRating);
        starsDiv.appendChild(starRating);

        // 2. Display service provided
        var serviceProvided = document.createElement('p');
        serviceProvided.textContent = `Service Provided: ${review.serviceProvided}`;
        reviewDiv.appendChild(starsDiv);
        reviewDiv.appendChild(serviceProvided);

        // 3. Display review comment
        var reviewText = document.createElement('p');
        reviewText.textContent = review.review;
        reviewDiv.appendChild(reviewText);

        // Append review element to reviews container
        reviewsContainer.appendChild(reviewDiv);
    });
}

function generateStars(starContainer, rating) {
    // Calculate filled stars (whole stars)
    var filledStars = Math.floor(rating);
    // Check if there should be a half star
    var halfStar = rating - filledStars >= 0.5;

    // Create star icons based on rating
    for (var i = 0; i < 5; i++) {
        var star = document.createElement('span');
        if (i < filledStars) {
            star.innerHTML = '<i class="fas fa-star"></i>'; // Full star icon
        } else if (i === filledStars && halfStar) {
            star.innerHTML = '<i class="fas fa-star-half-alt"></i>'; // Half star icon
        } else {
            star.innerHTML = '<i class="far fa-star"></i>'; // Empty star icon
        }
        starContainer.appendChild(star);
    }
}
