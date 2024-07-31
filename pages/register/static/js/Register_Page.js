document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phoneNumber');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingCircle = document.querySelector('.loading-circle');
  const loadingMessage = document.getElementById('loadingMessage');
  const statusIcon = document.getElementById('statusIcon');

 form.addEventListener('submit', async (event) => {
  event.preventDefault();

  loadingContainer.style.display = 'block';
  loadingCircle.classList.add('spin');
  loadingCircle.style.display = 'block';
  statusIcon.style.display = 'none';
  loadingMessage.textContent = 'Just a moment, checking the data...';

  const validationResult = validateForm();
  if (!validationResult.isValid) {
    loadingCircle.classList.remove('spin');
    loadingCircle.style.display = 'none';
    statusIcon.src = '/static/media/img/X icon.png';
    statusIcon.style.display = 'block';
    loadingMessage.textContent = validationResult.errorMessage;
    setTimeout(() => {
      loadingContainer.style.display = 'none';
    }, 3000);
    return;
  }

  // Proceed with AJAX request
  const formData = new FormData(form);
  const response = await fetch('/register', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  loadingCircle.classList.remove('spin');
  loadingCircle.style.display = 'none';
  statusIcon.src = result.success ? '/static/media/img/V icon.png' : '/static/media/img/X icon.png';
  statusIcon.style.display = 'block';
  loadingMessage.textContent = result.message;

  setTimeout(() => {
    loadingContainer.style.display = 'none';
    if (result.success) {
      window.location.href = '/signin';
    }
  }, 3000);
});

  const validateForm = () => {
    if (!firstNameInput.value.trim() ||
        !lastNameInput.value.trim() ||
        !emailInput.value.trim() ||
        !phoneInput.value.trim() ||
        !passwordInput.value.trim() ||
        !confirmPasswordInput.value.trim()) {
      return {
        isValid: false,
        errorMessage: 'Please fill in all required fields.'
      };
    }

    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(firstNameInput.value.trim())) {
      return {
        isValid: false,
        errorMessage: 'First name must contain only alphabetic characters.'
      };
    }
    if (!namePattern.test(lastNameInput.value.trim())) {
      return {
        isValid: false,
        errorMessage: 'Last name must contain only alphabetic characters.'
      };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid email address.'
      };
    }

    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
      return {
        isValid: false,
        errorMessage: 'Phone number must start with 0 and be followed by 9 digits.'
      };
    }

     if (passwordInput.value.trim().length < 8) {
      return {
        isValid: false,
        errorMessage: 'Password must be at least 8 characters long.'
      };
    }

    // Client-side validation
    if (passwordInput.value !== confirmPasswordInput.value) {
      return {
        isValid: false,
        errorMessage: 'Passwords do not match.'
      };
    }

    return {
      isValid: true
    };
  };
});
