// document.addEventListener('DOMContentLoaded', function() {
//     var signInForm = document.getElementById('signInForm');
//
//     signInForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//
//         var email = document.getElementById('email').value;
//         var password = document.getElementById('password').value;
//
//         // Perform form validation
//         var isValid = validateForm(email, password);
//
//         if (isValid) {
//             // Perform AJAX request to authenticate user
//             authenticateUser(email, password);
//         } else {
//             alert("Invalid email or password. Please try again.");
//         }
//     });
//
//     function validateForm(email, password) {
//         var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         var isValid = emailPattern.test(email) && password.length >= 8;
//         return isValid;
//     }
//
//     function authenticateUser(email, password) {
//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", "/signin", true);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 // Redirect to home page or handle success
//                 window.location.href = '/';
//             } else {
//                 // Handle error
//                 alert("Invalid email or password. Please try again.");
//             }
//         };
//         xhr.send("email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password));
//     }
// });
