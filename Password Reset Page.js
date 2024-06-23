document.addEventListener('DOMContentLoaded', function() {
    var resetPasswordForm = document.getElementById('resetPasswordForm');
    var resetMessage = document.getElementById('resetMessage');

    resetPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var newPassword = document.getElementById('newPassword').value;

        // Validate the new password
        if (!isValidPassword(newPassword)) {
            resetMessage.innerHTML = '<p style="color: #72383D;">Password must be at least 8 characters long and contain at least one number.</p>';
            return;
        }

        // Simulate AJAX request to reset the password
        resetPassword(newPassword);
    });

    function resetPassword(newPassword) {
        // Simulate the AJAX request with a timeout
        setTimeout(function() {
            // Assume password reset was successful
            resetMessage.innerHTML = '<p style="color: black;">Password has been reset successfully!</p>';
        }, 1000);

        window.location.href = "Sign In Page.html";
    }

    function isValidPassword(password) {
        // Password must be at least 8 characters long and contain at least one number
        return password.length >= 8 && /\d/.test(password);
    }
});
