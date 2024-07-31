from flask import Blueprint, render_template, session, redirect, url_for, jsonify, request
from db_connector import find_one_user, update_one_user

Profile_Editing_bp = Blueprint(
    'profileEditing',
    __name__,
    static_folder='static',
    static_url_path='/profileEditing/static',
    template_folder='templates'
)

# Route to display the profile editing page
@Profile_Editing_bp.route('/profile/edit', methods=['GET'])
def Profile_Editing_Page():
    if not session.get('logged_in'):
        return redirect(url_for('signIn.Sign_In_Page'))

    email = session.get('email')
    user = find_one_user(email)

    if user:
        return render_template('Profile_Editing_Page.html', user=user)
    else:
        # Handle the case where user is not found
        return redirect(url_for('signIn.Sign_In_Page'))

# Route to handle profile updates
@Profile_Editing_bp.route('/profile/update', methods=['POST'])
def update_profile():
    email = session.get('email')
    if not email:
        return jsonify({'success': False, 'message': 'User not logged in.'})

    # Get form data
    firstName = request.form.get('firstName')
    lastName = request.form.get('lastName')
    phoneNumber = request.form.get('phone')

    # Prepare the user data to be updated
    user_data = {
        'firstName': firstName,
        'lastName': lastName,
        'phoneNumber': phoneNumber
    }

    # Update the user in the database
    success, message = update_one_user(email, user_data)

    return jsonify({'success': success, 'message': message})
