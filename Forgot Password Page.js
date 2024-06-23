document.addEventListener('DOMContentLoaded', function() {
    var forgotPasswordForm = document.getElementById('forgotPasswordForm');
    var message = document.getElementById('message');

    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var securityQuestion = document.getElementById('securityQuestion').value;

        // Simulate an AJAX request to validate email and security question
        validateSecurityQuestion(email, securityQuestion);
    });

    function validateSecurityQuestion(email, securityQuestion) {
        // Simulate the AJAX request with a timeout
        setTimeout(function() {
            // Assume validation was successful if email and securityQuestion match
            var isValid = (email === "user@example.com" && securityQuestion === "Elementary School");

            if (isValid) {
                // Redirect to password reset page
                window.location.href = "Password Reset Page.html";
            } else {
                // Display an error message
                message.innerHTML = '<p style="color: #72383D;">Invalid email or answer to security question.</p>';
            }
        }, 1000);
    }
});
