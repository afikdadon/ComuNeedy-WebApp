document.addEventListener('DOMContentLoaded', function() {
   const editButton = document.getElementById('editProfileButton');
   editButton.addEventListener('click', function() {
       window.location.href = '/profile/edit';
   });
});

