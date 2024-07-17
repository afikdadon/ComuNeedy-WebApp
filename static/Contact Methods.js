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


       if(messageInput.value.length < 10){
           showError(messageInput, 'Please provide more details in your message (at least 10 characters) ' +
                                             'so we can better assist you');
           valid = false;
       }


         if(messageInput.value.length > 1000){
           showError(messageInput, 'Please shorten your message to 1000 characters or less ' +
                                           'so we can better assist you.');
           valid = false;
       }
         var numbersOnly = /^\d+$/;
         var specialCharsOnly = /^[^a-zA-Z0-9]+$/;
         var numbersAndSpecialCharsOnly = /^[\d\W]+$/;




        if (numbersOnly.test(messageInput.value)) {
            showError(messageInput, 'Your message cannot contain only numbers. ' +
                                              'Please provide more details.');
            valid = false;
        }


        if (specialCharsOnly.test(messageInput.value)) {
           showError(messageInput, 'Your message cannot contain only special characters. ' +
                                             'Please provide more details.');
           valid = false;
        }


         if (numbersAndSpecialCharsOnly.test(messageInput.value)) {
           showError(messageInput, 'Your message cannot contain only special characters and numbers. ' +
                                             'Please provide more details.');
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

