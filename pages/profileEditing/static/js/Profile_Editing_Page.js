document.addEventListener('DOMContentLoaded', function() {
   const form = document.getElementById('editProfileForm');
   const firstNameInput = document.getElementById('firstName');
   const lastNameInput = document.getElementById('lastName');
   const emailInput = document.getElementById('email');
   const phoneInput = document.getElementById('phone');
   const loadingContainer = document.getElementById('loadingContainer');
   const loadingCircle = document.querySelector('.loading-circle');
   const loadingMessage = document.getElementById('loadingMessage');
   const statusIcon = document.getElementById('statusIcon');

   // Store initial values
   const initialValues = {
       firstName: firstNameInput.value,
       lastName: lastNameInput.value,
       email: emailInput.value,
       phone: phoneInput.value
   };

   form.addEventListener('submit', function(event) {
       event.preventDefault();

       // Show loading animation and circle
       loadingContainer.style.display = 'block';
       loadingCircle.classList.add('spin');
       loadingCircle.style.display = 'block';
       statusIcon.style.display = 'none';
       loadingMessage.textContent = 'Just a moment, checking the data...';

       // Validate form inputs
       const validationResult = validateForm();
       if (!validationResult.isValid) {
           showError(validationResult.errorMessage);
           return;
       }

       // Check if inputs are identical to existing values
       if (inputsAreIdentical()) {
           showError('This data already exists in the system');
           return;
       }

       // Prepare form data to send
       const formData = new FormData(form);

       // Create an XMLHttpRequest object
       const xhr = new XMLHttpRequest();
       xhr.open('POST', '/profile/update', true);
       xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

       // Handle response
       xhr.onload = function() {
           if (xhr.status === 200) {
               const response = JSON.parse(xhr.responseText);
               if (response.success) {
                   showSuccess('The profile has been successfully updated!');
                   setTimeout(() => {
                       window.location.href = '/profile';
                   }, 3000); // Redirect after 3 seconds
               } else {
                   showError(response.message);
               }
           } else {
               showError('An error occurred while updating the profile.');
           }
       };

       // Convert FormData to URL-encoded string
       const urlEncodedData = new URLSearchParams(new FormData(form)).toString();
       xhr.send(urlEncodedData);
   });

   function validateForm() {
       // Check if required fields are filled
       if (firstNameInput.value.trim() === '' ||
           lastNameInput.value.trim() === '' ||
           emailInput.value.trim() === '' ||
           phoneInput.value.trim() === '') {
           return {
               isValid: false,
               errorMessage: 'The input is incorrect - Please fill in all required fields.'
           };
       }

       // Validate email format
       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailPattern.test(emailInput.value.trim())) {
           return {
               isValid: false,
               errorMessage: 'The input is incorrect - Email format is invalid.'
           };
       }

       // Validate phone number format (exactly 10 digits starting with '0')
       const phonePattern = /^0\d{9}$/;
       if (!phonePattern.test(phoneInput.value.trim())) {
           return {
               isValid: false,
               errorMessage: 'Phone number must start with 0 and be followed by 9 digits.'
           };
       }

       // Check if names contain only letters
       const namePattern = /^[A-Za-z]+$/;
       if (!namePattern.test(firstNameInput.value.trim()) ||
           !namePattern.test(lastNameInput.value.trim())) {
           return {
               isValid: false,
               errorMessage: 'The input is incorrect - Names can only contain letters.'
           };
       }

       // All validations passed
       return {
           isValid: true
       };
   }

   function inputsAreIdentical() {
       return firstNameInput.value.trim() === initialValues.firstName &&
           lastNameInput.value.trim() === initialValues.lastName &&
           emailInput.value.trim() === initialValues.email &&
           phoneInput.value.trim() === initialValues.phone;
   }

   function showError(message) {
       loadingCircle.classList.remove('spin');
       loadingCircle.style.display = 'none';
       statusIcon.src = 'X icon.png';
       statusIcon.style.display = 'block';
       loadingMessage.textContent = message;
       setTimeout(() => {
           loadingContainer.style.display = 'none';
       }, 3000);
   }

   function showSuccess(message) {
       loadingCircle.classList.remove('spin');
       loadingCircle.style.display = 'none';
       statusIcon.src = 'V icon.png';
       statusIcon.style.display = 'block';
       loadingMessage.textContent = message;
   }

});
