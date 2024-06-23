document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();

        let valid = true;

        // Check if all fields are filled
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required.');
            valid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required.');
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Email is not in the correct format.');
            valid = false;
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required.');
            valid = false;
        }

        if (valid) {
            saveData({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            });
            form.reset();
            alert('Message sent successfully!');
        }
    });

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        input.parentElement.appendChild(error);
        input.classList.add('input-error');
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.remove());
        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(input => input.classList.remove('input-error'));
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function saveData(data) {
        localStorage.setItem('contactData', JSON.stringify(data));
    }
});