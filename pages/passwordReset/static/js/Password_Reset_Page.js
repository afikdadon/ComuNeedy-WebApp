document.addEventListener('DOMContentLoaded', function() {
    var resetPasswordForm = document.getElementById('resetPasswordForm');
    var resetMessage = document.getElementById('resetMessage');

    resetPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var newPassword = document.getElementById('newPassword').value;
        var token = document.getElementById('token').value;

        // Validate the new password
        if (!isValidPassword(newPassword)) {
            resetMessage.innerHTML = '<p style="color: #72383D;">Password must be at least 8 characters long and contain at least one number.</p>';
            return;
        }

        // Send AJAX request to reset the password
        resetPassword(newPassword, token);
    });

    function resetPassword(newPassword, token) {
        fetch('/password-reset/' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'newPassword=' + encodeURIComponent(newPassword)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resetMessage.innerHTML = '<p style="color:#BFD7B5;">' + data.message + '</p>';
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 2000);
            } else {
                resetMessage.innerHTML = '<p style="color: #72383D;">' + data.message + '</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resetMessage.innerHTML = '<p style="color: #72383D;">An error occurred. Please try again later.</p>';
        });
    }

    function isValidPassword(password) {
        // Password must be at least 8 characters long and contain at least one number
        return password.length >= 8 && /\d/.test(password);
    }
});