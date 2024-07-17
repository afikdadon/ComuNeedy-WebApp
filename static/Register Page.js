document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registerForm');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingCircle = document.querySelector('.loading-circle');
  const loadingMessage = document.getElementById('loadingMessage');
  const statusIcon = document.getElementById('statusIcon');
  const confirmPasswordInput = document.getElementById('confirm-password');




  // Event listener for form submission
  form.addEventListener('submit', async function(event) {
      event.preventDefault();


      // Show loading animation and message
      loadingContainer.style.display = 'block';
      loadingCircle.classList.add('spin');
      loadingCircle.style.display = 'block';
      statusIcon.style.display = 'none'; // Hide status icon during loading
      loadingMessage.textContent = 'Just a moment, checking the data...';




      // Simulate server response delay
      setTimeout(async () => {
          // Validate form inputs
          const validationResult = validateForm();
          if (!validationResult.isValid) {
              loadingCircle.classList.remove('spin');
              loadingCircle.style.display = 'none';
              statusIcon.src = 'X icon.png'; // Set X icon source
              statusIcon.style.display = 'block';
              loadingMessage.textContent = validationResult.errorMessage;
              setTimeout(() => {
                  loadingContainer.style.display = 'none';
              }, 3000); // Hide after 3 seconds
              return;
          }




          // Check if the email already exists
          const emailExists = await checkEmailExists(emailInput.value.trim());
          if (emailExists) {
              loadingCircle.classList.remove('spin');
              loadingCircle.style.display = 'none';
              statusIcon.src = 'X icon.png'; // Set X icon source
              statusIcon.style.display = 'block';
              loadingMessage.textContent = 'Email already exists in the system.';
              setTimeout(() => {
                  loadingContainer.style.display = 'none';
              }, 3000); // Hide after 3 seconds
              return;
          }




          // If validations pass, proceed with registration
          loadingCircle.classList.remove('spin');
          loadingCircle.style.display = 'none';
          statusIcon.src = 'V icon.png'; // Set V icon source
          statusIcon.style.display = 'block';
          loadingMessage.textContent = `Welcome ${firstNameInput.value.trim()},\nProfile created successfully!`;
          setTimeout(() => {
              window.location.href = '/profile';
          }, 3000); // Redirect after 3 seconds
      }, 2000); // Simulate 2-second server response delay
  });




// Function to validate form inputs
function validateForm() {
  // Check if required fields are filled
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




      // Validate first and last name to contain only alphabetic characters
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




      // Validate email format using a regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
          return {
              isValid: false,
              errorMessage: 'Please enter a valid email address.'
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




      // Validate password complexity (optional)
      // Example: Password must be at least 8 characters long
      if (passwordInput.value.trim().length < 8) {
          return {
              isValid: false,
              errorMessage: 'Password must be at least 8 characters long.'
          };
      }








      // Check if password and confirm password match
      if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
          return {
          isValid: false,
          errorMessage: 'Passwords don`t match.'
  };
}




      // All validations passed
      return {
          isValid: true
      };
  }




  // Function to check if the email already exists in the system
  async function checkEmailExists(email) {
      // Simulate an API call to check if the email exists
      // Replace with actual API call in production
      const existingEmails = ['existing@example.com', 'user@example.com']; // Example existing emails
      return existingEmails.includes(email);
  }
});



