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


   form.addEventListener('submit', function(event) {
       event.preventDefault();


       // Show loading animation and circle
       loadingContainer.style.display = 'block';
       loadingCircle.classList.add('spin');
       loadingCircle.style.display = 'block';
       statusIcon.style.display = 'none'; // Hide status icon during loading
       loadingMessage.textContent = 'Just a moment, checking the data...';


       // Simulate server response delay
       setTimeout(() => {
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


           // Check if inputs are identical to existing values
           if (inputsAreIdentical()) {
               loadingCircle.classList.remove('spin');
               loadingCircle.style.display = 'none';
               statusIcon.src = 'X icon.png'; // Set X icon source
               statusIcon.style.display = 'block';
               loadingMessage.textContent = 'This data already exists in the system';
               setTimeout(() => {
                   loadingContainer.style.display = 'none';
               }, 3000); // Hide after 3 seconds
               return;
           }


           // If validations pass, proceed with profile update
           loadingCircle.classList.remove('spin');
           loadingCircle.style.display = 'none';
           statusIcon.src = 'V icon.png'; // Set V icon source
           statusIcon.style.display = 'block';
           loadingMessage.textContent = 'The profile has been successfully updated!';
           setTimeout(() => {
                window.location.href = '/profile';
           }, 3000); // Redirect after 3 seconds
       }, 2000); // Simulate 2-second server response delay
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


   // Function to check if inputs match existing values (mock example)
   function inputsAreIdentical() {
       const existingFirstName = 'John'; // Example existing data
       const existingLastName = 'Doe';
       const existingEmail = 'john.doe@example.com';
       const existingPhone = '1234567890';


       return firstNameInput.value.trim() === existingFirstName &&
           lastNameInput.value.trim() === existingLastName &&
           emailInput.value.trim() === existingEmail &&
           phoneInput.value.trim() === existingPhone;
   }
});

