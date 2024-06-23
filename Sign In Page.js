document.addEventListener('DOMContentLoaded', function() {
    var signInForm = document.getElementById('signInForm');

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Simulate AJAX request to authenticate user (replace with actual backend integration)
        authenticateUser(email, password);
    });

    function authenticateUser(email, password) {
        // Simulate AJAX request with a timeout
        setTimeout(function() {
            // Example: Assume email and password are valid (replace with actual authentication logic)
            var isValidUser = (email === "user@example.com" && password === "password");

            if (isValidUser) {
                // Redirect user to Home Page after successful login
                window.location.href = "Home Page.html";
            } else {
                // Display error message (in a real scenario, you would handle this differently)
                alert("Invalid email or password. Please try again.");
            }
        }, 1000); // Simulated delay of 1 second
    }
});
